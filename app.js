// calling angular in the js file
var game = angular.module("TTT", []);

// calling my controller
game.controller("gameController", gameController);

// game controller main function
function gameController($scope){


   // labeling variables with scope for angular and creating an empty array
   $scope.currentPlayer = 'O'
   $scope.player = 'O'
   $scope.winner = null
   $scope.board = [
   [null, null, null],
   [null, null, null],
   [null, null, null]
   ]



	// function that extracts the value of the cell(either 'X', 'O', or '-') and returns
	// a new class name that was added due to that value
	$scope.cellClass = function (row, column) {
		var value = cell(row, column);
		return 'cell cell-' + value ; 
	}

	// function that checks if the row/column has a value('X', 'O') and if not, writes(binds) a '?'
	$scope.cellText = function (row, column) {
		var value = cell(row, column);
		return value ? value : '?';
	}
   // function that checks when you click on it (via ng-click) if there is already a 
   // winner and alerts that there is already a winner
   $scope.cellClick = function (row, column) {
   	if ($scope.winner) {
   		alert('Sorry, game over! You can start a new game');
   		return;
   	}

   	// second part of the cellClick function that checks if the current player 
   	//is the one with the turn and alerts "not your turn if its not"
   	if ($scope.player != $scope.currentPlayer) {
   		alert('Wait your turn!');
   		return;
   	}

   	// set the value of the cell based on the current player, check winning conditions, set current
   	// player to next player (calling three different functions)
   	setCell(row, column, $scope.player)
   	checkBoard()
   	$scope.currentPlayer = nextPlayer($scope.currentPlayer)
   }

       // returns the value of cell into the array of null in $scope.board
       function cell(row, column) {
       	return $scope.board[row][column]
       }

       // function that resets the game to new and everything into null
       $scope.newGame = function () {
       	for (var i = 0; i < 3; i++) {
       		for (var j = 0; j < 3; j++) {
       			setCell(i, j, null);
       		}
       	}

       	$scope.currentPlayer = 'O';
       	$scope.player = 'O';
       	$scope.winner = null;
       }

 // function that sets the value of cell by setting value equal to "board" array 
 function setCell(row, column, value) {
 	$scope.board[row][column] = value;
 }
 // function that returns the value of the next player to play 
 function nextPlayer(player) 
 {
 	if(player == 'X'){
 		return 'O';
 	}

 	if(player == 'O'){
 		return 'X';
 	}
 	
 	return 'unknown'
 }
  // function that checks the board and declares a winner 
  function checkBoard() 
  {
  	var winner, empty = false

   
 
 	// check board vertically and horizontally by looping through the cell rows and if it is equal
 	// to a winning combo, it declares a winner

	for (var i = 0; i < 3; i++) 
	{
	 	if (cell(i, 0) != null && cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) 
	 	{
	 		winner = cell(i, 0)
	 	}
	 	if (cell(0, i) != null && cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) 
	 	{
	 		winner = cell(0, i)
	 	}
	 }
  
  	// check board diagonally just like it did through vertical and horizontal
  	if (cell(0, 0) && cell(0, 0) == cell(1, 1) && cell(1, 1) == cell(2, 2)) 
  	{
  		winner = cell(0, 0)
  	}
  
  	if (cell(0, 2) && cell(0, 2) == cell(1, 1) && cell(1, 1) == cell(2, 0)) 
  	{
  		winner = cell(0, 2)
  	}

	// is there a winner, set the winner's name to the winner global var
    if (winner) 
    {
		$scope.winner = winner
    }
    else
    {
    	 // check for any empty cell by looping through the "board" array 
	    for (var i = 0; i < 3; i++) 
	    {
	    	for (var j = 0; j < 3; j++) 
	    	{
	    		if (cell(i, j) == null) 
	    			empty = true
	    	}
	    }

	   	// no more empty cell - no winner, if empty is false, returns winner is NONE
	   	if (empty == false) 
	   	{
	   		$scope.winner = 'NOBODY!'
	   	}
    }

}
};















