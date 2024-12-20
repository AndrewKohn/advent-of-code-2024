"use strict";

const fs = require("fs");
const path = require("path");
const file = "manual.txt";
// const file = "sample_manual.txt";

const getData = (file) => {
    const data = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n");

    const rules = data
        .filter((line) => line.includes("|"))
        .map((rule) => rule.split("|").map(Number));
    const updates = data
        .filter((line) => line.includes(","))
        .map((update) => update.split(",").map(Number));

    return { rules, updates };
};

function printQueue() {
    const { rules, updates } = getData(file);
    let p1Results = 0,
        p2Results = 0;

    for (let i = 0; i < updates.length; i++) {
        let isValid = true;

        for (const [x, y] of rules) {
            const xIndex = updates[i].indexOf(x);
            const yIndex = updates[i].indexOf(y);

            if (xIndex !== -1 && yIndex !== -1 && xIndex > yIndex) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            const midIndex = Math.floor(updates[i].length / 2);
            p1Results += updates[i][midIndex];
        } else {
            const orderedPages = reorderPages(updates[i], rules);
            const midIndex = Math.floor(orderedPages.length / 2);
            p2Results += orderedPages[midIndex];
        }
    }

    return `d5p1: ${p1Results}\nd5p2: ${p2Results}`;
}

function reorderPages(update, rules) {
    const orderedPages = [];
    const added = new Set();

    while (orderedPages.length < update.length) {
        for (const page of update) {
            if (added.has(page)) continue;

            const canAdd = rules.every(([x, y]) => {
                if (!update.includes(x) || !update.includes(y)) {
                    return true;
                }

                if (y === page) return added.has(x);

                return true;
            });

            if (canAdd) {
                orderedPages.push(page);
                added.add(page);
                break;
            }
        }
    }

    return orderedPages;
}

console.log(printQueue());
