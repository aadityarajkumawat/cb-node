#!/usr/bin/env node

const fsPromises = require("fs").promises;
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

// program.version('0.1.0').arguments('<folder>')

(async () => {
  const files = await fsPromises.readdir("../repo");
  for (let i = 0; i < 5; i++) {
    if (files[i] !== "src") {
      console.log(files[i]);
      fs.createWriteStream(`../copyrepo/${files[i]}`);
      await fsPromises.copyFile(
        `../repo/${files[i]}`,
        `../copyrepo/${files[i]}`
      );
    }
  }
})().catch(console.error);
