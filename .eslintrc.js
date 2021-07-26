const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  // 检测ES6代码
  parser: 'babel-eslint',
  // 引入其他预设模块
  extends: ['airbnb', 'prettier'],
  // 引入规则插件
  plugins: ['prettier', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
  // 检测环境
  env: {
    browser: true, // 浏览器环境中的全局变量。
    node: true, // Node.js 全局变量和 Node.js 作用域。
    es6: true, // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
  },
  // 指定支持的 JavaScript 语言选项
  parserOptions: {
    ecmaVersion: 6, //  ES6 语法
    sourceType: 'module', // 代码是 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用jsx
    },
  },
  // 规则设置
  // 0或off：关闭规则
  // 1或warn：打开规则，并且作为一个警告（并不会导致检查不通过）
  // 2或error：打开规则，并且作为一个错误（退出码为1，检查不通过）
  // 数组：参数1：错误等级 参数2：处理方式
  rules: {
    'prettier/prettier': ['error', prettierOptions], // prettier规则
    'arrow-body-style': [2, 'as-needed'], // 要求箭头函数体使用大括号
    'class-methods-use-this': 0, // 强制类方法使用 this
    'import/order': 0, // 在模块导入顺序中执行约定
    'import/extensions': 0, // 确保在导入路径中一致使用文件扩展名
    'import/imports-first': 0, // 确保所有导入都出现在其他语句之前
    'import/named': 0, // 确保命名导入与远程文件中的命名导出相对应
    'import/newline-after-import': 0, // 在import语句后强制换行
    'import/no-dynamic-require': 0, // 禁止带表达式的require（）调用
    'import/no-duplicates': 0, // 报告同一模块在多个位置重复导入
    'import/no-cycle': 0, // 报告同一模块在多个位置重复导入
    'import/no-extraneous-dependencies': 0, // 禁止使用外来packages
    'import/no-named-as-default': 0, // 报告使用导出名称作为默认导出的标识符
    'import/no-named-as-default-member': 0, // 将导出名称的使用报告为默认导出的属性
    'import/no-unresolved': 0, // 确保导入指向可以解析的文件/模块
    'import/no-useless-path-segments': 0, // 在import和require语句中防止不必要的路径段
    'import/no-webpack-loader-syntax': 0, // 禁止导入中的webpack loader程序语法
    'import/no-self-import': 0, // 禁止模块将具有依赖路径的模块导入回其自身
    'import/prefer-default-export': 0, // 如果模块导出单个名称，则首选默认导出
    indent: [2, 2, { SwitchCase: 1 }], // 强制使用一致的缩进
    'jsx-a11y/aria-props': 2, // Enforce all aria-* props are valid.
    'jsx-a11y/heading-has-content': 0, // 强制标题（h1、h2等）元素包含可访问的内容。
    'jsx-a11y/label-has-associated-control': [2, { controlComponents: ['Input'] }], // 强制label标签具有文本标签和关联控件。
    'jsx-a11y/label-has-for': 0, // label需要htmlFor
    'jsx-a11y/mouse-events-have-key-events': 2, // 强制onMouseOver/onMouseOut与onFocus/onBlur一起用于仅键盘用户。
    'jsx-a11y/role-has-required-aria-props': 2, // 强制具有ARIA角色的元素必须具有该角色所需的所有属性。
    'jsx-a11y/role-supports-aria-props': 2, // 强制定义了显式或隐式角色的元素只包含该角色支持的aria-*属性。
    'max-len': 0, // 强制一行的最大长度
    'newline-per-chained-call': 0, // 要求方法链中每个调用都有一个换行符
    'no-confusing-arrow': 0, // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-console': 1, // 禁用 console
    'no-debugger': 1, // 禁用 debugger
    'no-unused-vars': 2, // 禁止出现未使用过的变量
    'no-use-before-define': 0, // 禁止在变量定义之前使用它们
    'prefer-template': 2, // 要求使用模板字面量而非字符串连接
    'react/destructuring-assignment': 0, // 组件中强制要求解构赋值
    'react-hooks/rules-of-hooks': 'error', // 强制执行hooks的规则
    'react/jsx-closing-tag-location': 0, // 验证闭标签的位置
    'react/forbid-prop-types': 0, // 禁止特定的propType
    'react/jsx-first-prop-new-line': [2, 'multiline'], // 限制首个属性的位置
    'react/jsx-filename-extension': 0, // 限制文件扩展名
    'react/jsx-no-target-blank': 0, // 避免使用不安全的target=_blank属性
    'react/jsx-props-no-spreading': 0, // 避免jsx使用解构赋值
    'react/jsx-uses-vars': 2, // 防止使用中的变量错误的标记为未使用
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'react/require-default-props': 0, // 为不是必需属性的每个属性强制默认属性定义
    'react/self-closing-comp': 0, // 防止没有孩子的组件有额外的闭标签
    'react/sort-comp': 0, // 强制组件方法顺序
    'redux-saga/no-yield-in-race': 2, // Prevent usage of yield in race entries
    'redux-saga/yield-effects': 2, // Ensure effects are yielded
    'require-yield': 0, // 	要求 generator 函数内有 yield
  },
  // ESLint 支持在配置文件添加共享设置。
  // 你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。
  // 如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
