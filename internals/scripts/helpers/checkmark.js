const chalk = require('chalk');

function addCheckMark(callback, fail = false) {
  if (fail) {
    process.stdout.write(chalk.red(' ×'));
  } else {
    process.stdout.write(chalk.green(' ✓'));
  }
  if (callback) callback();
}

module.exports = addCheckMark;
