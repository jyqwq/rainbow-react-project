/* eslint-disable no-restricted-syntax */
require('shelljs/global');

const fs = require('fs');
const nodeGlob = require('glob');
const { transform } = require('@babel/core');
const get = require('lodash/get');

const animateProgress = require('./helpers/progress');
const addCheckmark = require('./helpers/checkmark');

const { appLocales, DEFAULT_LOCALE } = require('../../app/i18n');

const babel = require('../../babel.config.js');
const { presets } = babel;
let plugins = babel.plugins || [];

plugins.push('react-intl');

plugins = plugins.filter(p => p !== 'styled-components');

const FILES_TO_PARSE = 'app/**/messages.js';

const newLine = () => process.stdout.write('\n');

let progress;
const task = message => {
  progress = animateProgress(message);
  process.stdout.write(message);

  return error => {
    if (error) {
      process.stderr.write(error);
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  };
};

const glob = pattern =>
  new Promise((resolve, reject) => {
    nodeGlob(pattern, (error, value) => (error ? reject(error) : resolve(value)));
  });

const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, value) => (error ? reject(error) : resolve(value)));
  });

const oldLocaleMappings = [];
const localeMappings = [];

for (const locale of appLocales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};

  const translationFileName = `app/translations/${locale}.json`;
  try {
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);
    for (const messageKey of messageKeys) {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `加载当前国际化信息文件出错: ${translationFileName}
        \n${error}`,
      );
    }
  }
}

const extractFromFile = async filename => {
  try {
    const code = await readFile(filename);
    const output = await transform(code, { filename, presets, plugins });
    const messages = get(output, 'metadata.react-intl.messages', []);

    for (const message of messages) {
      for (const locale of appLocales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id] || '';
        let newMsg = '';
        if (locale === DEFAULT_LOCALE) {
          newMsg = message.defaultMessage;
        } else if (message.description) {
          newMsg = message.description;
        }
        localeMappings[locale][message.id] = newMsg || oldLocaleMapping;
      }
    }
  } catch (error) {
    process.stderr.write(`\n国际化信息文件出错: ${filename}\n${error}\n`);
  }
};

const memoryTask = glob(FILES_TO_PARSE);
const memoryTaskDone = task('在内存中存储语言文件');

memoryTask.then(files => {
  memoryTaskDone();

  const extractTask = Promise.all(files.map(fileName => extractFromFile(fileName)));
  const extractTaskDone = task('对所有文件进行国际化信息提取');
  extractTask.then(() => {
    extractTaskDone();

    let localeTaskDone;
    let translationFileName;

    for (const locale of appLocales) {
      translationFileName = `app/translations/${locale}.json`;
      localeTaskDone = task(`将国际化信息 ${locale} 写入: ${translationFileName}`);

      const messages = {};
      Object.keys(localeMappings[locale])
        .sort()
        .forEach(key => {
          messages[key] = localeMappings[locale][key];
        });

      const prettified = `${JSON.stringify(messages, null, 2)}\n`;

      try {
        fs.writeFileSync(translationFileName, prettified);
        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `保存当前国际化文件的时候出现错误: ${translationFileName}
          \n${error}`,
        );
      }
    }

    process.exit();
  });
});
