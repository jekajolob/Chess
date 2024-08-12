const board = document.querySelector('.chess-board');
let selectedPiece = null;
let currentPlayer = 'white';

const pieces = {
    '1': ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    '2': ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    '7': ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    '8': ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
};

for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
        const square = document.createElement('div');
        const isBlack = (row + col) % 2 === 0;
        square.classList.add(isBlack ? 'black' : 'white');
        square.dataset.row = row;
        square.dataset.col = col;
        
        const piece = pieces[row] && pieces[row][col - 1];
        if (piece) {
            square.textContent = piece;
            square.dataset.piece = piece;
            square.dataset.color = row <= 2 ? 'white' : 'black';
        }

        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    }
}

function handleSquareClick(event) {
    const square = event.target;
    const piece = square.dataset.piece;
    const color = square.dataset.color;

    if (selectedPiece) {
        // Move the piece
        movePiece(square);
    } else if (piece && color === currentPlayer) {
        // Select a piece
        selectPiece(square);
    }
}

function selectPiece(square) {
    clearHighlights();
    selectedPiece = square;
    square.classList.add('selected');
    highlightPossibleMoves(square);
}

function movePiece(targetSquare) {
    if (targetSquare.classList.contains('possible-move')) {
        targetSquare.textContent = selectedPiece.textContent;
        targetSquare.dataset.piece = selectedPiece.dataset.piece;
        targetSquare.dataset.color = selectedPiece.dataset.color;
        
        selectedPiece.textContent = '';
        delete selectedPiece.dataset.piece;
        delete selectedPiece.dataset.color;

        selectedPiece.classList.remove('selected');
        selectedPiece = null;

        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        clearHighlights();
    } else {
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        clearHighlights();
    }
}

function highlightPossibleMoves(square) {
    // Basic move logic, can be expanded for each piece type
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    const potentialMoves = [
        { row: row - 1, col: col },  // Up
        { row: row + 1, col: col },  // Down
        { row: row, col: col - 1 },  // Left
        { row: row, col: col + 1 }   // Right
    ];

    potentialMoves.forEach(move => {
        const targetSquare = document.querySelector(`[data-row='${move.row}'][data-col='${move.col}']`);
        if (targetSquare && !targetSquare.dataset.piece) {
            targetSquare.classList.add('possible-move');
        }
    });
}

function clearHighlights() {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.possible-move').forEach(el => el.classList.remove('possible-move'));
}
