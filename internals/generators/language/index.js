const fs = require('fs');
const { exec } = require('child_process');

function languageIsSupported(language) {
  try {
    fs.accessSync(`app/translations/${language}.json`, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  description: '添加一种语言',
  prompts: [
    {
      type: 'input',
      name: 'language',
      message: '您希望添加i18n支持的语言是什么（例如 "fr", "de"）？',
      default: 'en',
      validate: value => {
        if (/.+/.test(value) && value.length === 2) {
          return languageIsSupported(value) ? `已经支持语言 "${value}" 了` : true;
        }

        return '需要2个字符的语言说明符';
      },
    },
  ],

  actions: ({ test }) => {
    const actions = [];

    if (test) {
      // 备份将被修改的文件以便我们可以还原它们
      actions.push({
        type: 'backup',
        path: '../../app',
        file: 'i18n.js',
      });

      actions.push({
        type: 'backup',
        path: '../../app',
        file: 'app.js',
      });
    }

    actions.push({
      type: 'modify',
      path: '../../app/i18n.js',
      pattern: /(const ..LocaleData = require\('react-intl\/locale-data\/..'\);\n)+/g,
      templateFile: './language/intl-locale-data.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/i18n.js',
      pattern: /(\s+'[a-z]+',\n)(?!.*\s+'[a-z]+',)/g,
      templateFile: './language/app-locale.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/i18n.js',
      pattern:
        /(const ..TranslationMessages = require\('\.\/translations\/..\.json'\);\n)(?!const ..TranslationMessages = require\('\.\/translations\/..\.json'\);\n)/g,
      templateFile: './language/translation-messages.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/i18n.js',
      pattern: /(addLocaleData\([a-z]+LocaleData\);\n)(?!.*addLocaleData\([a-z]+LocaleData\);)/g,
      templateFile: './language/add-locale-data.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/i18n.js',
      pattern:
        /([a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),\n)(?!.*[a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),)/g,
      templateFile: './language/format-translation-messages.hbs',
    });
    actions.push({
      type: 'add',
      path: '../../app/translations/{{language}}.json',
      templateFile: './language/translations-json.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: '../../app/app.js',
      pattern:
        /(import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),\n)(?!.*import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),)/g,
      templateFile: './language/polyfill-intl-locale.hbs',
    });

    if (!test) {
      actions.push(() => {
        const cmd = 'npm run extract-intl';
        exec(cmd, (err, result) => {
          if (err) throw err;
          process.stdout.write(result);
        });
        return 'modify translation messages';
      });
    }

    return actions;
  },
};
