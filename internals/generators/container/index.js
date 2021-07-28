const componentExists = require('../utils/componentExists');

module.exports = {
  description: '添加一个容器',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '容器名是什么？',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value) ? '已经存在相同的容器名或者组件名' : true;
        }

        return '容器名为必填';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: true,
      message: '是否要将容器包装在React.memo中？',
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: true,
      message: '是否需要页面头部信息？',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: '容器是否需要 actions/constants/selectors/reducer ？',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: '容器是否需要Saga？',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: '容器是否需要国际化组件？',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: '容器是否要异步加载？',
    },
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.js',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/nodes.js',
        templateFile: './container/nodes.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/messages.js',
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantActionsAndReducer) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });

      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/saga.js',
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.js',
        templateFile: './container/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
