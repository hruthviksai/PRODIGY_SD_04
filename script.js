document.addEventListener('DOMContentLoaded', () => {
    createGrid();
});

function createGrid() {
    const gridContainer = document.querySelector('.grid');
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            input.dataset.row = row;
            input.dataset.col = col;
            gridContainer.appendChild(input);
        }
    }
}

function getGrid() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
        grid[row] = [];
        for (let col = 0; col < 9; col++) {
            const cellValue = document.querySelector(`input[data-row='${row}'][data-col='${col}']`).value;
            grid[row][col] = cellValue ? parseInt(cellValue) : 0;
        }
    }
    return grid;
}

function setGrid(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.querySelector(`input[data-row='${row}'][data-col='${col}']`).value = grid[row][col] ? grid[row][col] : '';
        }
    }
}

function solveSudoku() {
    const grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert('No solution exists');
    }
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solve(grid, row = 0, col = 0) {
    if (row === 9 - 1 && col === 9) {
        return true;
    }
    if (col === 9) {
        row++;
        col = 0;
    }
    if (grid[row][col] > 0) {
        return solve(grid, row, col + 1);
    }
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid, row, col + 1)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}
