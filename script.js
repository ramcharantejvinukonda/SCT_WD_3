// Select all cells
const cells = document.querySelectorAll(".cell");

// Select status text
const statusText = document.getElementById("status");

// Select restart button
const resetButton = document.getElementById("resetBtn");


// Game board
let board = ["", "", "", "", "", "", "", ""];


// Current player
let currentPlayer = "X";


// Game status
let gameActive = true;


// Winning combinations
const winningPatterns = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// Add click event to every cell
cells.forEach(cell => {

    cell.addEventListener("click", handleCellClick);

});


// Function to handle user click
function handleCellClick(event) {

    const clickedCell = event.target;

    const clickedIndex = clickedCell.getAttribute("data-index");


    // Stop if cell is already filled
    if (board[clickedIndex] !== "" || !gameActive) {

        return;

    }


    // Store current player symbol
    board[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;


    // Add CSS class
    clickedCell.classList.add(currentPlayer.toLowerCase());


    // Check game result
    checkResult();

}


// Check winner
function checkResult() {

    let winnerFound = false;


    for (let pattern of winningPatterns) {

        const position1 = board[pattern[0]];

        const position2 = board[pattern[1]];

        const position3 = board[pattern[2]];


        if (

            position1 !== "" &&

            position1 === position2 &&

            position2 === position3

        ) {

            winnerFound = true;

            break;

        }

    }


    // If winner is found
    if (winnerFound) {

        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

        gameActive = false;

        return;

    }


    // Check draw
    if (!board.includes("")) {

        statusText.textContent = "🤝 Game Draw!";

        gameActive = false;

        return;

    }


    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";


    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}


// Restart game
resetButton.addEventListener("click", resetGame);


function resetGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;


    statusText.textContent = "Player X's Turn";


    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

    });

}