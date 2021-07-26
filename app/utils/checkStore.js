import { conformsTo, isFunction, isObject } from 'lodash';
import invariant from 'invariant';

/**
 * 验证 redux store 的有效性
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  invariant(conformsTo(store, shape), '(app/utils...) injectors: 需要有效的 redux store');
}
