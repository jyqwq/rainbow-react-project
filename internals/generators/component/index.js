const componentExists = require('../utils/componentExists');

module.exports = {
  description: '添加一个组件',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '组件名是什么？',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value) ? '已经存在相同的容器名或者组件名' : true;
        }

        return '组件名为必填';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: true,
      message: '是否要将组件包装在React.memo中？',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: '组件是否需要国际化组件？',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: '组件是否要异步加载？',
    },
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/nodes.js',
        templateFile: './container/nodes.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/Loadable.js',
        templateFile: './container/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
