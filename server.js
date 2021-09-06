const app = require('./app');
const http = require('http');
const PORT = 8080
const util = require('util')
const cronScoreUpdate = require('./cronScoreUpdate')

// First this file will run

http.createServer(app).listen(PORT,()=>{
    cronScoreUpdate
    util.log("Server has been started by Ankit Dhariwal on %d",PORT)
})

