const path = require("path")
const playerDataFilePath = path.join(__dirname, '..', 'dataFiles','playerData.txt')
const gameDataFilePath = path.join(__dirname, '..', 'dataFiles','gameData.txt')
const playerController = require('./playerController')
const util = require("util")
const fs = require("fs")


exports.readDataFile = async function(filePath) {
    const promises = require('fs').promises;
    try {
        const data = await promises.readFile(filePath,'utf8'); 
        return JSON.parse(data)
    } catch (error) {
        return error
    }
}

exports.updateDataFile = function (filePath,data){

    fs.writeFile(filePath, JSON.stringify(data), function(err){
        if(err){
            util.log(err);
            return;
        }
        util.log("File is updated");
    });
}

exports.search = function (myArray, email, id){
    for (let i=0; i < myArray.length; i++) {
        if(id != 0 && Object.keys(myArray[i]).length > 0) {
            if(myArray[i].id == id){
                return i
            } else if(myArray[i].email === email){
                return -2
            }
        } 
    }
    return -1
}

exports.getPlayerByplayerId = async function (req, res) {
    // Will return the player details 
    let playerId = req.params.player_id
    let playerData = await playerController.readDataFile(playerDataFilePath)
    let idx = playerController.search(playerData, "", playerId)
    res.setHeader('Content-Type', 'application/json')
    if(!playerData[idx]) {
        return res.status(404).send("Player does not exist with player_id: "+playerId)
    }
    let sortedplayerArr = sortplayerByScore(playerData)
    for(let i=0;i<sortedplayerArr.length;i++){
        sortedplayerArr[i].rank = (sortedplayerArr.length-i).toString()
    }
    playerController.updateDataFile(playerDataFilePath, sortedplayerArr)
    return res.status(200).send(playerData[idx])
}

exports.addNewPlayerToGame = async function (req, res) {

    // Will add a new player to a game
    let body = req.body
    if(!body.game_id) {
        return res.status(412).send("game_id is essential parameter to add a player")
    }
    if(!body.name || !body.email) {
        return res.status(412).send("Name / Email is missing")
    }

    let gameId = body.game_id
    let gameData = await playerController.readDataFile(gameDataFilePath)
    let playerData = await playerController.readDataFile(playerDataFilePath)
    let idx = playerController.search(gameData, "", gameId)
    let pIdx = playerController.search(playerData, body.email, -1)
    res.setHeader('Content-Type', 'application/json')

    if(idx == -1 || !gameData[idx]) {
        return res.status(404).send("Game does not exist with game_id: "+gameId)
    }
    if(!gameData[idx].game_active){
        return res.status(200).send("Game does not in active state game_id :"+gameId)
    }
    if(pIdx == -2) {
        return res.status(404).send("Email exist, please try new email :<"+ body.email + "> in game_id : "+gameId)
    }
    
    let playerIdArr = gameData[idx].player_ids
    let newPlayerId = playerData.length+1 
    playerIdArr.push(newPlayerId.toString())
    gameData[idx].no_of_players = (playerIdArr.length).toString()
    gameData[idx].player_ids = playerIdArr
    
    let newPlayerObj = {
        "id": newPlayerId,
        "name": body.name,
        "email": body.email,
        "game_id": gameId,
        "rank": "0",
        "fruits_earned":"0",
        "player_score":"0"
    }
    playerData.push(newPlayerObj)
    playerController.updateDataFile(playerDataFilePath, playerData)
    playerController.updateDataFile(gameDataFilePath, gameData)
    return res.status(200).send({"game_id":gameId, "player_id":newPlayerId})
}

exports.getTopNPlayer = async function(req, res) {
    
    let n = req.params.count
    res.setHeader('Content-Type', 'application/json')
    if(n < 1){
        return res.status(412).send("N should be greater than 0")
    }
    let playerData = await playerController.readDataFile(playerDataFilePath)
    let sortedplayerArr = sortplayerByScore(playerData)
    for(let i=0;i<sortedplayerArr.length;i++){
        sortedplayerArr[i].rank = (sortedplayerArr.length-i).toString()
    }
    playerController.updateDataFile(playerDataFilePath, sortedplayerArr)
    let topNplayer = sortedplayerArr.slice(-1*n).reverse()
    return res.status(200).send({topNplayer})
}

function sortplayerByScore(playerData, score){
    return playerData.sort(function(a, b) {
        var x = parseInt(a.player_score)
        var y = parseInt(b.player_score)
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

