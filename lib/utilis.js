const path = require("path");
const fs = require("fs");

const colors = require("colors");
colors.setTheme({});

function join(...args) {
  return path.join(...args);
}

function readFileSync(...args) {
  return fs.readFileSync(...args);
}

function writeFileSync(...args) {
  return fs.writeFileSync(...args);
}

function cpSync(...args) {
  return fs.cpSync(...args);
}

function extend(...args) {
  return Object.assign(...args);
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}

module.exports = {
  join,
  readFileSync,
  writeFileSync,
  cpSync,
  extend,
  isObject
};
