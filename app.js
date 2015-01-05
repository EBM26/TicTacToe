// calling angular and firebase in the js file
var game = angular.module("TTT", ['firebase']);

// calling my controller
game.controller("gameController", gameController);

// injecting firebase into my controller
gameController.$inject = ['$scope', '$firebase'];

// game controller main function
function gameController($scope, $firebase)
{

  

   // setting function getGame equal to $scope.game in order to sync firebase to the game
   
   $scope.game = getGame();
  

   // returns the value of cell into the array of '' in $scope.board
    function cell(row, column) {
        return $scope.game.board[row][column]
       }

   //function that extracts game info and puts it into firebase 
   function getGame() {
    var ref = new Firebase('https://eyaltictactoe.firebaseio.com/');
    var player = $firebase(ref).$asObject();

    return player;
  }

  // initialization code. Checks if we need player two then assigns player accordingly
  // also creates empty array to move to 
  $scope.game.$loaded().then(function() {
        if($scope.game.iAmPlayerTwo){
            $scope.player = 'X';
            $scope.game.iAmPlayerTwo = false;

        }
        else {
          $scope.player = 'O';
          $scope.game.iAmPlayerTwo = true;
          $scope.game.board = [['', '', ''], ['', '', ''], ['', '', '']];
          $scope.game.currentPlayer = 'O';
          $scope.game.winner = false;


        }
        $scope.game.$save();  
   });

	// function that extracts the value of the cell(either 'X', 'O', or '?') and returns
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
   // function that checks when y ou click on it (via ng-click) if there is already a 
   // winner and alerts that there is already a winner
   $scope.cellClick = function (row, column) {
   	if ($scope.winner) {
   		alert('Sorry, game over! You can start a new game');
   		return;
   	}

   	// second part of the cellClick function that checks if the current player 
   	//is the one with the turn and alerts "not your turn if its not"
   	if ($scope.player != $scope.game.currentPlayer) {
   		alert('Wait your turn!');
   		return;
   	}
    // boolean that check if space is taken 
    if ($scope.game.board[row][column] != ''){
      alert('Planet already taken!')
      return
    }

   	// Calling three different functions: set the value of the cell based on the current player, 
   	// check winning conditions, set current player to next player 
   	setCell(row, column, $scope.player);

    checkBoard();
    $scope.game.currentPlayer = nextPlayer($scope.game.currentPlayer);
    $scope.game.$save();
  }


    // function that resets the game to new and everything into ''
       $scope.newGame = function () {
       	for (var i = 0; i < 3; i++) {
       		for (var j = 0; j < 3; j++) {
       			setCell(i, j, '');
       		}
       	}

       	$scope.game.currentPlayer = 'O';
       	$scope.player = 'O';
       	$scope.winner = '';
       }

 // function that sets the value of cell by setting value equal to "board" array 
 function setCell(row, column, value) {
 	$scope.game.board[row][column] = value;
  $scope.game.$save();

 }
 // function that returns the value of the next player to play 
 function nextPlayer(player) 
 {
  console.log(player);
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
     if (cell(i, 0) != '' && cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) 
     {
      winner = cell(i, 0)
    }
    if (cell(0, i) != '' && cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) 
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

	// if there is a winner, set the winner's name to the winner global var
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
         if (cell(i, j) == '') 
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















