import React from 'react';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * 动态注入一个reducer
 *
 * @param {string} key reducer的模块名称
 * @param {function} reducer 一个将被注入的reducer函数
 *
 */
const useInjectReducer = ({ key, reducer }) => {
  // 获取顶级父组件的context
  const context = React.useContext(ReactReduxContext);
  // 当前组件初始化的时候执行一次Reducer注入
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
