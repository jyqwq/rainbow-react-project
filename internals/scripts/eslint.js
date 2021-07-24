/* eslint-disable no-console */
const { ESLint } = require('eslint');
const chalk = require('chalk');

const eslint = new ESLint({
  fix: true,
  useEslintrc: true,
  ignorePath: '.eslintignore',
});

const startEslint = async () => {
  try {
    console.log('开始校验代码');

    const results = await eslint.lintFiles(['.']);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter('stylish');

    const resultText = formatter.format(results);

    if (resultText) {
      console.error(`代码校验未通过：
      ${chalk.red(resultText)}
      `);
    } else {
      console.log(`代码校验通过 ${chalk.green('✓')}`);
    }
  } catch (error) {
    process.exitCode = 1;
    console.error(`代码校验错误：
      ${chalk.red(error)}
      `);
  }
};

startEslint().then(() => console.log('校验结束'));
