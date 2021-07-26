import invariant from 'invariant';
import { isEmpty, isFunction, isString, conformsTo } from 'lodash';

import checkStore from './checkStore';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key =>
  invariant(isString(key) && !isEmpty(key), '(app/utils...) injectSaga: 模块名称key应为非空字符串');

const checkDescriptor = descriptor => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: 应该传入一个有效的 saga descriptor',
  );
};

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;
    // 验证参数合法性
    checkKey(key);
    checkDescriptor(newDescriptor);
    // 是否已经有saga注册过
    let hasSaga = Reflect.has(store.injectedSagas, key);
    // 如果不是生产环境，则执行热更新判断，因为在开发环境下saga是不会改变的
    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // 如果新的saga与旧的不同则注销旧的
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }
    // 如果没有注册过saga或者注册模式为重新装载时重新启动则注册当前saga
    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    // 验证参数合法性
    checkKey(key);
    // 判断是否存在当前模块的saga
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      // 如果不是默认注册模式，则每次都要注销当前saga
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // 生产过程中的清理；在开发过程中，我们需要“descriptor.saga”进行热重新加载
        if (process.env.NODE_ENV === 'production') {
          // 需要一些值才能检测“ONCE_TILL_UNMOUNT”saga中的`injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store) {
  // 检查store的有效性
  checkStore(store);

  return {
    // 注册sage
    injectSaga: injectSagaFactory(store, true),
    // 注销saga
    ejectSaga: ejectSagaFactory(store, true),
  };
}
