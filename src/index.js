#!/usr/bin/env node

const fsPromises = require("fs").promises;
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const fsExtra = require("fs-extra");
const path = require("path");
const repoPath = path.resolve(__dirname, "repo");
// cool

program
  .version("0.1.0")
  .arguments("<folder>")
  .description("Take folder name", {
    newFolder: "Enter name of folder: ",
  })
  .action((newFolder) => {
    (async () => {
      fs.mkdir(path.join(process.cwd(), `/${newFolder}`), (e) => {
        if (e) throw new Error(e.message);
      });
      const files = await fsPromises.readdir(repoPath);
      for (let i = 0; i < 5; i++) {
        if (files[i] !== "src") {
          fs.createWriteStream(
            path.join(process.cwd(), `/${newFolder}/${files[i]}`)
          );
          await fsPromises.copyFile(
            path.join(repoPath, `/${files[i]}`),
            path.join(process.cwd(), `/${newFolder}/${files[i]}`)
          );
        }
        // This is a directory
        else if (files[i] == "src") {
          fs.mkdir(path.join(process.cwd(), `/${newFolder}/src`), (e) => {
            if (e) throw new Error(e.message);
          });

          fsExtra.copySync(
            path.join(repoPath, "/src"),
            path.join(process.cwd(), `/${newFolder}/src`),
            {
              overwrite: true,
            }
          );
        }
      }
    })().catch(console.error);
  });

program.parse();
