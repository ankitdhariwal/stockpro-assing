Ankit Dhariwal -- StockPro

Player Obj
{
      "id":1,
      "name":"Ankit Dhariwal",
      "email":"ankitdhariwal2@gmail.com",
      "game_id":1,
      "rank":"0",
      "fruits_earned":"0",
      "player_score":"0"
}
Game Obj
 {
      "id":1,
      "no_of_players":"1",
      "player_ids":["1","2","3","4","5","6","7","8"],
      "description":"",
      "game_active":true,
      "game_started":"",
      "game_ended":""
}

::: POINTS THAT ARE DECIDED ::::::

==> Only for the single game, but used game_id for multiple game is scaling is required.
==> CRON JOB is used for the score update, fruit_earned after every 5s.
==> All the player details stored in dataFiles/playerData.txt.
==> All the game details are stored in dataFiles/gameData.txt.


::: TO RUN THE CODE ::::::

npm install
node server.js
---------------------------
cron job will work automatically.
postman collection shared link - https://www.getpostman.com/collections/755f067b7b59c9621653



::: APIs Used :::: PORT-8080

1) http://localhost:8080/ping (GET)

=> To check that code is working , will retur Pong.



2) http://localhost:8080/addplayertogame (POST)

=> To Add a new Player , only when is game is active ,to a particular id.
=> New email is required for the new user.
   Body  {
        "game_id": 1,
        "name":"Ramesh gupta",
        "email":"ramesh.gupta.jonh@gmail.com"
    }



3) http://localhost:8080/player-details/4 (GET)

=>  At any given time, the user playing needs to know his/her rank along with the score.



4) http://localhost:8080/game-players/1 (GET)

=> Get players IDS , in the game acc to game_id.



5) http://localhost:8080/game-details/1 (GET)

=> Get game details , with the game is.




6)  http://localhost:8080/endgame (PUT)

=> To end the game , with game_id.
    body{
            "game_id":1
        }



7) http://localhost:8080/get-top-player/4(PUT)

=> TOP N players for the provided n.

