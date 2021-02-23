#!/usr/bin/env node

const fsPromises = require("fs").promises;
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

// program.version('0.1.0').arguments('<folder>')

(async () => {
  const files = await fsPromises.readdir("../repo");
  console.log(files);
})().catch(console.error);
