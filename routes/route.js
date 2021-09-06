const express = require('express')
const app = express()
const playerController = require('../controllers/playerController')
const gameController =  require('../controllers/gameController')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

app.get('/ping',(req,res)=>{
    res.send('pong')
})

// Routes for Player
// To send all the data in playerData.

app.get('/player-details/:player_id',  jsonParser, playerController.getPlayerByplayerId)
app.post('/addplayertogame', jsonParser, playerController.addNewPlayerToGame)
app.get('/get-top-player/:count', jsonParser, playerController.getTopNPlayer)

// Routes for Game
// To send all the data in gameData.

app.get('/game-players/:game_id', jsonParser, gameController.getAllPlayer)
app.get('/game-details/:game_id', jsonParser, gameController.getGameById)
app.put('/endgame', jsonParser, gameController.endGameById)


module.exports = app;
