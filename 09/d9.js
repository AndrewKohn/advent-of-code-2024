"use strict";

const fs = require("fs");
const path = require("path");
const file = "disk_map.txt";
// const file = "sample_disk_map.txt";

const getData = (file) => {
    const data = fs
        .readFileSync(path.resolve(__dirname, file), "utf8")
        .split("")
        .filter((line) => line.trim() !== "");

    return data;
};

const createDiskMap = (data) => {
    const diskMap = [];
    let fileID = 0;

    for (let i = 0; i < data.length; i++) {
        const len = parseInt(data[i]);
        if (i % 2 === 0) {
            for (let j = 0; j < len; j++) {
                diskMap.push(fileID);
            }
            fileID++;
        } else {
            for (let j = 0; j < len; j++) {
                diskMap.push(".");
            }
        }
    }

    return sortToLeft(diskMap);
};

const sortToLeft = (diskMap) => {
    let writePos = 0;

    for (let readPos = diskMap.length - 1; readPos >= 0; readPos--) {
        if (diskMap[readPos] !== ".") {
            while (diskMap[writePos] !== "." && writePos < diskMap.length) {
                writePos++;
            }
            diskMap[writePos] = diskMap[readPos];
            diskMap[readPos] = ".";
        }
    }

    return diskMap.reverse();
};

function diskFragmenter() {
    const data = getData(file);
    let p1Result = 0,
        p2Result = 0;
    const diskMap = createDiskMap(data);

    for (let i = 0; i < diskMap.length; i++) {
        if (diskMap[i] === ".") break;

        p1Result += i * diskMap[i];
    }

    return `d9p1: ${p1Result}\nd9p2: ${p2Result}`;
}

console.log(diskFragmenter());
