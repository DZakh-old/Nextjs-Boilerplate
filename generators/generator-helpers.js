const fs = require('fs');

const flatMap = require('lodash/flatMap');
const includes = require('lodash/includes');
const map = require('lodash/map');
const split = require('lodash/split');

function getNameFirstPart(name) {
  return split(name, '.')[0] || '';
}

function entityExists(folderPaths, name) {
  const existingEntityNames = flatMap(folderPaths, (folderPath) => {
    return map(fs.readdirSync(folderPath), getNameFirstPart);
  });

  return includes(existingEntityNames, name);
}

module.exports = { entityExists };
