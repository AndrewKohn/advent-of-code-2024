"use strict";

const fs = require("fs");
const path = require("path");
const file = "corrupted_instructions.txt";
// const file = "sample_instructions.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function mullItOver() {
    const data = getData(file);
    let p1Result = 0;
    let p2Result = 0;

    // part one
    const p1Regex = /mul\((-?\d+),(-?\d+)\)/g;
    const p1Arr = [...data.matchAll(p1Regex)];

    const p1Instructions = p1Arr.map((match) => [
        parseInt(match[1]),
        parseInt(match[2]),
    ]);

    for (let i = 0; i < p1Instructions.length; i++) {
        p1Result += p1Instructions[i][0] * p1Instructions[i][1];
    }

    // part two
    const p2Regex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)|dont\(\)/g;
    let isEnabled = true;

    const p2Arr = [...data.matchAll(p2Regex)].filter((match) => {
        if (match[0] === "do()") {
            isEnabled = true;
        } else if (match[0] === "don't()" || match[0] === "dont()") {
            isEnabled = false;
        }

        return isEnabled && match[1] && match[2];
    });

    const p2Instructions = p2Arr.map((match) => [
        parseInt(match[1]),
        parseInt(match[2]),
    ]);

    for (let i = 0; i < p2Instructions.length; i++) {
        p2Result += p2Instructions[i][0] * p2Instructions[i][1];
    }

    return `d3p1: ${p1Result}\nd3p2: ${p2Result}`;
}

console.log(mullItOver());
