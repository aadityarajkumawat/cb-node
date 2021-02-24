#!/usr/bin/env node

const { Command } = require("commander");
const fsPromises = require("fs").promises;
const fs = require("fs");
const childProcess = require("child_process");

const fsExtra = require("fs-extra");
const path = require("path");

const program = new Command();
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
      if (newFolder !== ".") {
        fs.mkdir(path.join(process.cwd(), `/${newFolder}`), (e) => {
          if (e) throw new Error(e.message);
        });
      }

      const files = await fsPromises.readdir(repoPath);

      for (let i = 0; i < 6; i++) {
        if (files[i] !== "src" && files[i] !== undefined) {
          fs.createWriteStream(
            path.join(process.cwd(), `/${newFolder}/${files[i]}`)
          );

          await fsPromises.copyFile(
            path.join(repoPath, `/${files[i]}`),
            path.join(process.cwd(), `/${newFolder}/${files[i]}`)
          );
        }
        // This is a directory
        else if (files[i] == "src" && files[i] !== undefined) {
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

      childProcess.exec(`cd ${newFolder} && git init`);
      console.log("Initialized as a git repository");
      console.log("Installing dependencies using npm");
      childProcess.exec(`cd ${newFolder} && npm install`);

      if (newFolder === ".") {
      } else {
        console.log(`cd ${newFolder}`);
      }
      console.log("Start server by 'yarn watch' and 'yarn dev1'");
    })().catch(console.error);
  });

program.parse();
