"use strict";

const fs = require("fs");
const path = require("path");
const file = "locations.txt";
// const file = "locations_sample.txt";

const sortFromLowestToHighest = (side) => {
    return side.sort((a, b) => a - b);
};

function historianHysteria(file) {
    const left = [];
    const right = [];
    fs.readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
            const pair = line
                .trim()
                .split(/\s+/)
                .map((location) => Number(location.trim()));

            left.push(pair[0]);
            right.push(pair[1]);
        });

    sortFromLowestToHighest(left);
    sortFromLowestToHighest(right);

    let p1Result = 0;
    let p2Result = 0;
    let i = 0;

    while (i < left.length) {
        // console.log(`[${left[i]}, ${right[i]}]`);
        p1Result += Math.abs(left[i] - right[i]);

        let count = 0;

        right.forEach((num) => {
            if (left[i] === num) count++;
        });

        p2Result += left[i] * count;
        i++;
    }

    return `d1p1: ${p1Result}\nd1p2: ${p2Result}`;
}

console.log(historianHysteria(file));
