const fs = require('fs');
const path = require('path');

class Parser {
  constructor(config) {
    this.config = config;
  }

  parseFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    const parsedData = {};
    const sections = {};

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) return;

      const match = trimmedLine.match(/^([a-zA-Z_][a-zA-Z_0-9]*)\s*:\s*(.*)$/);
      if (match) {
        const key = match[1];
        const value = match[2];

        if (!parsedData[key]) {
          parsedData[key] = {};
        }

        parsedData[key][value] = sections[value] || {};
      } else if (trimmedLine.startsWith('[')) {
        const sectionName = trimmedLine.slice(1, -1);
        sections[sectionName] = {};
      } else if (trimmedLine.startsWith(']')) {
        const sectionName = Object.keys(sections).pop();
        delete sections[sectionName];
      }
    });

    return parsedData;
  }
}

module.exports = Parser;