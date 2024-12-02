"use strict";

const fs = require("fs");
const path = require("path");
const file = "unusual_data.txt";
// const file = "sample_data.txt";

const getData = (file) => {
    const data = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const arr = data.map((line) => line.split(" ").map((str) => Number(str)));

    return arr;
};

function redNosedReports() {
    const reports = getData(file);
    const min = 1,
        max = 3;
    let p1Result = 0,
        p2Result = 0;

    // part one
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];
        let isSafe = false;

        const isReportSafe = (arr) => {
            const initTrend = arr[0] < arr[1];

            for (let j = 0; j < arr.length - 1; j++) {
                const current = arr[j],
                    next = arr[j + 1];
                const currentTrend = current < next;

                if (currentTrend !== initTrend) return false;

                const diff = Math.abs(current - next);
                if (diff < min || diff > max) return false;
            }
            return true;
        };

        if (isReportSafe(report)) {
            isSafe = true;
        }

        if (isSafe) p1Result++;
    }

    // part two
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];
        let isSafe = false;

        const isReportSafe = (arr) => {
            const initTrend = arr[0] < arr[1];

            for (let j = 0; j < arr.length - 1; j++) {
                const current = arr[j],
                    next = arr[j + 1];
                const currentTrend = current < next;

                if (currentTrend !== initTrend) return false;

                const diff = Math.abs(current - next);
                if (diff < min || diff > max) return false;
            }
            return true;
        };

        if (isReportSafe(report)) {
            isSafe = true;
        } else {
            for (let j = 0; j < report.length; j++) {
                const modifiedReport = [...report.slice(0, j), ...report.slice(j + 1)];
                if (isReportSafe(modifiedReport)) {
                    isSafe = true;
                    break;
                }
            }
        }

        if (isSafe) p2Result++;
    }

    return `d2p1: ${p1Result} safe reports\nd2p2: ${p2Result} dampened safe reports`;
}

console.log(redNosedReports());
