#!/usr/bin/env node

const fsPromises = require("fs").promises;
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const newFolder = "copyrepo";
// cool

(async () => {
  fs.mkdir(`../${newFolder}`, (e) => {
    if (e) throw new Error(e.message);
  });
  const files = await fsPromises.readdir("../repo");
  for (let i = 0; i < 5; i++) {
    if (files[i] !== "src") {
      console.log(files[i]);
      fs.createWriteStream(`../${newFolder}/${files[i]}`);
      await fsPromises.copyFile(
        `../repo/${files[i]}`,
        `../${newFolder}/${files[i]}`
      );
    }
    // This is a directory
    else if (files[i] == "src") {
      fs.mkdir(`../${newFolder}/src`, (e) => {
        if (e) throw new Error(e.message);
      });
      const srcFiles = await fsPromises.readdir("../repo/src");
      console.log(srcFiles);
    }
  }
})().catch(console.error);
