const fs = require("fs");
const readline = require("readline");

const baseDirname = "./base/";
let entity = "";
let entityPlural = "";
let mapping = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt();

/*** PRIVATE METHODS */
function prompt() {
  rl.question("What is the entity name (ex: product)? ", function (pEntity) {
    rl.question(
      "What is the plural of the entity name (ex: products)? ",
      function (pEntityPlural) {
        entity = pEntity;
        entityPlural = pEntityPlural;
        mapping = generateMapping();
        rl.close();
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
    const dirName = mapping["base|lowercase"];
    fs.mkdir(dirName, (err) => {
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
      writeFile(dirName, genFileName, genContent);
    });
  });
}

function generateContent(dirName, filename, content) {
  // New file name
  const genFileName = filename.replace("base", dirName);
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

function writeFile(dirName, filename, content) {
  const path = `./${dirName}/${filename}`;
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("file written successfully: ", filename);
  });
}
