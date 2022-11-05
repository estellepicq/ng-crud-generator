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
  rl.question("What is the entity name (ex: product)? ", function (pEntity) {
    rl.question(
      "What is the plural of the entity name (ex: products)? ",
      function (pEntityPlural) {
        rl.question(
          "Where to create the new folder (ex: shop)? ",
          function (pNewDirname) {
            rl.question(
              "Do you want to create a module (y/n)? ",
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
    base: entity.charAt(0).toUpperCase() + entity.slice(1), // capitalize
    "base|lowercase": entity.toLowerCase(),
    "base|uppercase": entity.toUpperCase(),
    "base|plural": entityPlural,
  };
}

function generateCrud() {
  fs.readdir(baseDirname, function (err, filenames) {
    if (err) {
      console.error(err);
      return;
    }
    const dirName = `${newDirname}/${mapping["base|lowercase"]}`;
    fs.mkdir(path.join(__dirname, dirName), { recursive: true }, (err) => {
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
    fs.readFile(baseDirname + filename, "utf-8", function (err, content) {
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
  const genFileName = dirName + '/' + filename.replace("base", mapping["base|lowercase"]);
  // New content
  let genContent = content;
  for (const mappingProperty in mapping) {
    genContent = genContent.replaceAll(
      `{{{${mappingProperty}}}}`,
      mapping[mappingProperty]
    );
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
