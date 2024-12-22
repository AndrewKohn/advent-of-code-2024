"use strict";

const fs = require("fs");
const path = require("path");
const file = "frequencies.txt";
// const file = "sample_frequencies.txt";

const getData = (file) => {
    const map = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() !== "");

    return map;
};

const checkBoundaries = (pos, map) => {
    const [x, y] = pos;

    return x >= 0 && y >= 0 && x < map[0].length && y < map.length;
};

const findFrequencies = (map) => {
    const frequencies = new Map();

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const char = map[y][x];

            if (char !== ".") {
                if (!frequencies.has(char)) frequencies.set(char, []);
                frequencies.get(char).push([x, y]);
            }
        }
    }

    return frequencies;
};

const findAntinodes = (frequencies, map) => {
    const antinodes = new Set();

    frequencies.forEach((pos) => {
        for (let i = 0; i < pos.length; i++) {
            for (let j = i + 1; j < pos.length; j++) {
                const [x1, y1] = pos[i];
                const [x2, y2] = pos[j];

                // calculate antinode pos
                const dx = x2 - x1;
                const dy = y2 - y1;

                // apply antinodes position to points
                const antinode1 = [x1 - dx, y1 - dy];
                const antinode2 = [x2 + dx, y2 + dy];

                if (checkBoundaries(antinode1, map)) {
                    antinodes.add(antinode1.join(","));
                }

                if (checkBoundaries(antinode2, map)) {
                    antinodes.add(antinode2.join(","));
                }
            }
        }
    });

    return antinodes.size;
};

const findUpdatedAntinodes = (frequencies, map) => { };

function resonantCollinearity() {
    const map = getData(file);
    const frequencies = findFrequencies(map);
    const p1Results = findAntinodes(frequencies, map);
    // const p2Results = findUpdatedAntinodes(frequencies, map);

    return `d8p1: ${p1Results} antinodes\nd8p2: [TODO]`;
}

console.log(resonantCollinearity());
