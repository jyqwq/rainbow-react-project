/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-------------------------------------------');

const logger = {
  error: err => {
    try {
      let msg = '';
      if (Object.prototype.toString.call(err) === '[object String]') {
        msg = err;
      } else {
        msg = err.msg ? err.msg : JSON.stringify(err);
      }
      console.error(chalk.red(msg));
    } catch (e) {
      console.error(chalk.red(err));
    }
  },
  appStarted: (port, host, tunnelStarted) => {
    console.log(`服务启动成功 ! ${chalk.green('✓')}`);
    if (tunnelStarted) {
      console.log(`通道初始化完成 ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('访问URL:')}${divider}
        本地地址: ${chalk.magenta(`http://${host}:${port}`)}
        局域网: ${
          chalk.magenta(`http://${ip.address()}:${port}`) +
          (tunnelStarted
            ? `
        外网: ${chalk.magenta(tunnelStarted)}`
            : '')
        }${divider}
${chalk.blue(`输入 ${chalk.italic('CTRL-C')} 停止项目`)}`);
  },
};

module.exports = logger;
