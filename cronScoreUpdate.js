const cron = require("node-cron")
const path = require("path")
const playerController = require('./controllers/playerController')
const playerDataFilePath = path.join(__dirname, '', 'dataFiles','playerData.txt')
const util = require('util')

// Creating a cron job which runs on every 5 second
const scoreUpdateCron =  cron.schedule("*/5 * * * * *", async function() {
    
    let playerData = await playerController.readDataFile(playerDataFilePath)
    let min = 0
    let max = Math.floor(playerData.length-1) 
    let idx = Math.floor(Math.random() * (max - min + 1) + min)
    playerData[idx].player_score = (parseInt(playerData[idx].player_score) + 10).toString()
    playerData[idx].fruits_earned = (parseInt(playerData[idx].fruits_earned) + 1).toString()
    playerController.updateDataFile(playerDataFilePath, playerData)
    idx+=1
    util.log("The player_id : "+ idx + " <at> " + new Date().toLocaleString()) 
});

module.exports.scoreUpdateCron = scoreUpdateCron