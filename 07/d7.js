"use strict";

const fs = require("fs");
const path = require("path");
const file = "calibrations.txt";
// const file = "sample_calibrations.txt";

const getData = (file) => {
    const data = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const calibrations = data.map((line) => {
        const vals = line.split(" ");
        const calibration = Number(vals[0].slice(0, -1));
        const testValues = vals.slice(1).map((val) => Number(val));

        return { target: calibration, vals: testValues };
    });

    return calibrations;
};

function bridgeRepair() {
    const calibrations = getData(file);
    let p1Result = 0,
        p2Result = 0;

    for (const calibration of calibrations) {
        const { target, vals } = calibration;

        if (findOperators(target, vals, false).length > 0) {
            p1Result += target;
        }

        if (findOperators(target, vals, true).length > 0) {
            p2Result += target;
        }
    }

    return `d7p1: ${p1Result}\nd7p2: ${p2Result}`;
}

function findOperators(target, vals, includeConcat) {
    const results = [];

    const dfs = (index, currentResult, operators) => {
        if (index === vals.length) {
            if (currentResult === target) results.push(operators);
            return;
        }

        dfs(
            index + 1,
            currentResult + vals[index],
            `${operators} + ${vals[index]}`,
        );
        dfs(
            index + 1,
            currentResult * vals[index],
            `${operators} * ${vals[index]}`,
        );

        if (includeConcat) {
            const concatenatedValue = Number(`${currentResult}${vals[index]}`);
            dfs(index + 1, concatenatedValue, `${operators} || ${vals[index]}`);
        }
    };

    dfs(1, vals[0], `${vals[0]}`); // recursion init

    return results;
}

console.log(bridgeRepair());
