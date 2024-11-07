#! /usr/bin/env node
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import path from "path";
import * as readlineSync from "readline-sync";

let args = process.argv.slice(2);

let bootstrapCSS = "";
let bootstrapJS = "";
let jQueryJS = "";

let currentDir = path.resolve(".");
if (args[0]) {
  if (path.isAbsolute(args[0])) {
    currentDir = args[0];
  } else {
    currentDir = path.join(currentDir, args[0]);
  }
}
if (fs.existsSync(currentDir)) {
  console.log(currentDir);
} else {
  console.log("Does Not Exist, making directory " + currentDir);
  fs.mkdirSync(currentDir, true);
}
fsExtra.emptyDirSync(currentDir);
fs.mkdirSync(path.join(currentDir, "js"));
fs.mkdirSync(path.join(currentDir, "css"));

let pathName = readlineSync.question(
  `Input Name (Default: ${path.basename(currentDir)})`
);

let bootstrap = readlineSync.question(
  `Enable Bootstrap? (Default: n, y to enable)`
);
if (bootstrap.toLowerCase() == "y") {
  bootstrapCSS =
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">';
  bootstrapJS =
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>';
}

let jQuery = readlineSync.question(
    `Enable jQuery? (Default: n, y to enable)`
  );
  if (jQuery.toLowerCase() == "y") {
    jQueryJS =
      '<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>';
  }
if (!pathName) {
  pathName = path.basename(currentDir);
}

const html_file = fs.readFileSync(
  path.join(import.meta.dirname, "template", "index.html")
);
const html_data = eval("`" + html_file + "`");

const manifest_file = fs.readFileSync(
  path.join(import.meta.dirname, "template", "manifest.json")
);
const manifest_data = eval("`" + manifest_file + "`");

fs.writeFileSync(path.join(currentDir, "index.html"), html_data);
fs.writeFileSync(path.join(currentDir, "manifest.json"), manifest_data);
fs.copyFileSync(
  path.join(import.meta.dirname, "template", "js", "main.js"),
  path.join(currentDir, "js", "main.js")
);
fs.copyFileSync(
  path.join(import.meta.dirname, "template", "css", "style.css"),
  path.join(currentDir, "css", "style.css")
);
fs.copyFileSync(
  path.join(import.meta.dirname, "template", "sw.js"),
  path.join(currentDir, "sw.js")
);
