const fs = require('fs');

const { flatMap, includes, map, split } = require('lodash');

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
