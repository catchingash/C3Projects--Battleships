$(document).ready(function(){

  /* Stores the board info
    0 for empty
    1 for ship
    X when hit
  */
  var board = [];

  // Stores the locations of the ships
  var ships = [];

  // Current number of ships
  var shipNum = 2;

  // Size of the board
  var boardSize = 10;

  // Bool indicating whether or not game is over
  var gameOver = false;

  // Number of ship hits
  var hits = 0;

  // Number of guesses
  var guesses = 0;

  initializeGame();

  function initializeGame(){
    generateRandomBoard();
    printBoard();
  }

  function generateRandomBoard(){
    // Add some random ships
    var shipsAdded = 0;
    while (shipsAdded < shipNum) {
      var randomVal = Math.floor(Math.random() * (boardSize - 1));
      if (ships.indexOf(randomVal) < 0) { // Not already one of the ships
        ships.push(randomVal);
        shipsAdded++;
      }
    }

    // Set the board values based on ships added
    for(var j = 0; j < boardSize; j++) {
      if (ships.indexOf(j) < 0) { // This location not a ship
        board[j] = 0;   // Empty
      } else {
        board[j] = 1;   // Ship!
      }
    }
  }

  function printBoard() {
    var boardOut = "";
    for(var i = 0; i < boardSize; i++) {
      boardOut += board[i];
    }
    $("#board").text(boardOut);
  }

  function endGame() {
    // TODO: End game
    gameOver = true;
    var message = (hits >= shipNum) ? 'YOU WIN!' : 'YOU LOSE!';
    $('#end-game').text(message);

    // ADDED FUN: Disable submit button
    $('#submit').attr('disabled', true);

    console.log("End game");
  }

  // CLICK HANDLERS
  $("#submit").click(userGuess);

  function userGuess(){
    // Retrieve the guess from the input box
    guess = $('#guess').val();

    // Reset the guess input box
    $('#guess').val('');

    // Verify the guess is in a valid range
    if (guess < 0 || guess > boardSize - 1) {
      return;
    }

    // Check if the guess matches one of our ships locations
    if (ships.indexOf(parseInt(guess)) >= 0) {
      // If it does, mark is as a HIT
      board[guess] = 'X';
      hits += 1;
      $('#guess-result').text('HIT!');
    } else {
      // If it doesn't, mark it as a MISS
      board[guess] = '-';
      $('#guess-result').text('MISS!');
    }

    guesses += 1;

    // Continue gameplay
    // Redraw the board if it has changed
      printBoard();
    // Tell the user how many guesses they've made
      $('#guess-count').text('Num guesses: ' + guesses);

    // NOTE: How does the game end?
    if (guesses >= 5 || hits >= shipNum) {
      endGame();
    }
  }
});
