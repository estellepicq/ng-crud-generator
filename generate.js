const fs = require("fs");
const readline = require("readline");
const baseDirname = "./base/";
const path = require('path');

let entity = "";
let entityPlural = "";
let mapping = {};
let newDirname = "";
let addModule = false;

prompt();

/*** PRIVATE METHODS */
function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("1. What is the entity name (ex: product)? ", function (pEntity) {
    rl.question(
      "2. What is the plural of the entity name (ex: products)? ",
      function (pEntityPlural) {
        rl.question(
          "3. Where to create the new folder, relative to ./src/app/ (ex: shop)? ",
          function (pNewDirname) {
            rl.question(
              "4. Do you want to create a module (y/n)? ",
              function (pAddModule) {
                if (!pEntity || !pEntityPlural || !pNewDirname || !pAddModule) {
                    console.log("ERROR: Invalid configuration");
                    rl.close();
                    process.exit(1);
                }
                entity = pEntity;
                entityPlural = pEntityPlural;
                newDirname = pNewDirname;
                mapping = generateMapping();
                addModule = pAddModule === 'y';
                rl.close();
              }
            );
          }
        );
      }
    );
  });

  rl.on("close", function () {
    generateCrud();
  });
}

function generateMapping() {
  return {
    base_capitalized: entity.charAt(0).toUpperCase() + entity.slice(1), // capitalize
    base_plural_capitalized: entityPlural.charAt(0).toUpperCase() + entityPlural.slice(1), // capitalize
    base_lowercase: entity.toLowerCase(),
    base_uppercase: entity.toUpperCase(),
    base_plural: entityPlural.toLowerCase(),
  };
}

function generateCrud() {
  fs.readdir(path.join(__dirname, baseDirname), function (err, filenames) {
    if (err) {
      console.error(err);
      return;
    }
    const dirName = path.join('./src/app', `${newDirname}/${mapping["base_plural"]}`);
    fs.mkdir(dirName, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      createFiles(dirName, filenames);
    });
  });
}

function createFiles(dirName, filenames) {
  filenames.forEach(function (filename) {
    if (filename === 'base.module.ts' && !addModule) {
        return;
    }
    fs.readFile(path.join(__dirname, baseDirname) + filename, "utf-8", function (err, content) {
      if (err) {
        console.error(err);
        return;
      }
      const { genFileName, genContent } = generateContent(
        dirName,
        filename,
        content
      );
      writeFile(genFileName, genContent);
    });
  });
}

function generateContent(dirName, filename, content) {
  // New file name
  const genFileName = `${dirName}/${filename.replace("base", mapping["base_lowercase"])}`;
  // New content
  let genContent = content;
  for (const mappingProperty in mapping) {
    const re = new RegExp(`{{{${mappingProperty}}}}`, "g");
    genContent = genContent.replace(re, mapping[mappingProperty]);
  }
  return { genFileName, genContent };
}

function writeFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("file written successfully: ", filename);
  });
}
