const path = require("path")
const gameDataFilePath = path.join(__dirname, '..', 'dataFiles','gameData.txt')
const playerController = require('./playerController')
const util = require("util")
const fs = require("fs")


exports.getAllPlayer = async function (req, res) {

    let gameId = req.params.game_id
    res.setHeader('Content-Type', 'application/json')
    if(!gameId) {
        return res.status(412).send("game_id is essential parameter")
    }
    let gameData = await playerController.readDataFile(gameDataFilePath)
    let idx = playerController.search(gameData, "", gameId)
    if(!gameData[idx]){
        return res.status(404).send("game_id does not exist : " + gameId)
    }
    let playerIdArr = gameData[idx].player_ids
    if(playerIdArr < 1) {
        return res.status(200).send("No player enter in this gameId : "+ gameId)
    }
    return res.status(200).send({"player_ids": playerIdArr})
}

exports.getGameById = async function (req, res) {

    let gameId = req.params.game_id
    res.setHeader('Content-Type', 'application/json')
    if(!gameId) {
        return res.status(412).send("game_id is essential parameter")
    }
    let gameData = await playerController.readDataFile(gameDataFilePath)
    let idx = playerController.search(gameData, "", gameId)
    if(!gameData[idx]){
        return res.status(404).send("game_id does not exist :" + gameId)
    }
    return res.status(200).send(gameData[idx])
}

exports.endGameById = async function (req, res) {
    
    let body = req.body
    if(!body.game_id) {
        return res.status(412).send("game_id is essential parameter to add a player")
    }
    let gameId = body.game_id
    res.setHeader('Content-Type', 'application/json')
    let gameData = await playerController.readDataFile(gameDataFilePath)
    let idx = playerController.search(gameData, "", gameId)
    if(!gameData[idx]){
        return res.status(404).send("game_id does not exist: "+gameId)
    }
    gameData[idx].game_active = false
    playerController.updateDataFile(gameDataFilePath, gameData)
    return res.status(200).send("Game ended with game_id: "+ gameId)
}
