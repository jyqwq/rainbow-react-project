const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const languageGenerator = require('./language/index.js');

const BACKUPFILE_EXTENSION = 'rbgen';

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.js',
    )}`;

    // eslint-disable-next-line no-useless-catch
    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
  plop.setActionType('backup', (answers, config) => {
    // eslint-disable-next-line no-useless-catch
    try {
      fs.copyFileSync(
        path.join(__dirname, config.path, config.file),
        path.join(__dirname, config.path, `${config.file}.${BACKUPFILE_EXTENSION}`),
        'utf8',
      );
      return path.join(__dirname, config.path, `${config.file}.${BACKUPFILE_EXTENSION}`);
    } catch (err) {
      throw err;
    }
  });
};

module.exports.BACKUPFILE_EXTENSION = BACKUPFILE_EXTENSION;
