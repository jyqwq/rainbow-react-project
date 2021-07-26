import { takeLatest, delay } from 'redux-saga/effects';
import { DEFAULT_ACTION } from './constants';

// 页面初始化
export function* defaultSaga() {
  try {
    yield delay(3000);
    console.log('delay 3s log');
  } catch (error) {
    console.log(error);
  }
}

export default function* homeSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultSaga);
}
