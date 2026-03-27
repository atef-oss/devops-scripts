// parser.js
const fs = require('fs');
const path = require('path');

class Parser {
  constructor(file) {
    this.file = file;
  }

  parse() {
    const fileContent = fs.readFileSync(this.file, 'utf8');
    const lines = fileContent.split('\n');

    const regex = /(\w+)\s*=\s*(\w+)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(fileContent))!== null) {
      matches.push({ key: match[1], value: match[2] });
    }

    return matches;
  }
}

module.exports = Parser;