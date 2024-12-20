// TODO : Part one completed; start part two

"use strict";

const fs = require("fs");
const path = require("path");
// const file = "patrol_map.txt";
const file = "sample_map.txt";

const getData = (file) => {
    const map = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() !== "");

    return map;
};

function guardGallivant() {
    const map = getData(file);
    let [x, y] = getStartingPoint(map);
    const directions = [
        [-1, 0], // north
        [0, 1], // east
        [1, 0], // south
        [0, -1], // west
    ];
    let dirIndex = 0;
    const patrolPath = new Set();
    patrolPath.add(`[${x}, ${y}]`);
    let p1Result = 0,
        p2Result = 0;

    while (true) {
        const [dx, dy] = directions[dirIndex];
        const nextX = x + dx;
        const nextY = y + dy;

        if (
            nextX < 0 ||
            nextY < 0 ||
            nextX >= map.length ||
            nextY >= map[0].length ||
            map[nextX][nextY] === "#"
        ) {
            dirIndex = (dirIndex + 1) % 4; // rotate 90 deg
        } else {
            x = nextX;
            y = nextY;
            patrolPath.add(`[${x}, ${y}]`);
        }

        if (nextX < 0 || nextY < 0 || nextX >= map.length || nextY >= map[0].length)
            break;
    }

    p1Result = patrolPath.size;

    return `d6p1: ${p1Result}\nd6p2: ${p2Result}`;
}

const getStartingPoint = (map) => {
    const startingPoint = [];

    for (let i = 0; i < map.length; i++) {
        if (map[i].includes("^")) {
            startingPoint.push(i);
            startingPoint.push(map[i].indexOf("^"));
        }
    }

    return startingPoint;
};

console.log(guardGallivant());
