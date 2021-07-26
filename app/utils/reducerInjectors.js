import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: 模块名称key应为非空字符串且reducer应该是一个reducer function',
    );

    // 开发过程中我们可能会修改Reducer
    // 判断 `store.injectedReducers[key] === reducer` 以便在模块key相同但是reducer不同时执行热加载
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    // 替换新的injectedReducers
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  // 检查store的有效性
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
