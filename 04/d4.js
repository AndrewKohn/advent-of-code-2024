"use strict";

const fs = require("fs");
const path = require("path");
const file = "word_search.txt";
// const file = "sample_word_search.txt";

const getData = (file) => {
    const data = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .map((row) => row.split(""));

    return data;
};

function ceresSearch() {
    const grid = getData(file);
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
        [0, 1], // right
        [0, -1], // left
        [-1, 0], // up
        [1, 0], // down
        [1, -1], // down-left
        [1, 1], // down-right
        [-1, -1], // up-left
        [-1, 1], // up-right
    ];
    let p1Result = 0,
        p2Result = 0;

    // checks for out-of-bounds
    const isValid = (row, col) =>
        row >= 0 && row < rows && col >= 0 && col < cols;

    // part one
    const searchStart = (row, col, direction, targetWord) => {
        const [rowOffset, colOffset] = direction;

        for (let i = 0; i < targetWord.length; i++) {
            const newRow = row + i * rowOffset;
            const newCol = col + i * colOffset;

            if (!isValid(newRow, newCol) || grid[newRow][newCol] !== targetWord[i])
                return false;
        }
        return true;
    };

    // part two
    const checkDiagonals = (r1, c1, r2, c2, r3, c3, targetWord) => {
        if (!isValid(r1, c1) || !isValid(r2, c2) || !isValid(r3, c3)) return false;

        const str = grid[r1][c1] + grid[r2][c2] + grid[r3][c3];
        const reverseWord = targetWord.split("").reverse().join("");

        return str === targetWord || str === reverseWord;
    };

    // check for results
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (let direction of directions) {
                if (searchStart(row, col, direction, "XMAS")) {
                    p1Result++;
                }
            }

            if (grid[row][col] === "A") {
                const fromTopLeftToBottomRight = checkDiagonals(
                    row - 1,
                    col - 1,
                    row,
                    col,
                    row + 1,
                    col + 1,
                    "MAS",
                );
                const fromBottomLeftToTopRight = checkDiagonals(
                    row + 1,
                    col - 1,
                    row,
                    col,
                    row - 1,
                    col + 1,
                    "MAS",
                );

                if (fromTopLeftToBottomRight && fromBottomLeftToTopRight) p2Result++;
            }
        }
    }
    return `d4p1: ${p1Result} times "XMAS" appears\nd4p2: ${p2Result} times "X-MAS" appears`;
}

console.log(ceresSearch());
