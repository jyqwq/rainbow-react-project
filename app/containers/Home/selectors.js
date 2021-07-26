import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Home状态域的直接选择器
// 返回当前模块的state
const selectHomeDomain = state => state.home || initialState;

/**
 * reselect可以对传入的依赖做一个缓存，如果传入的函数的结果不变，那返回的结果也不会变
 * 在依赖函数中只直接取值，不针对值进行计算，将计算放到createSelector中最后一个参数的函数中
 */

const makeSelectHome = () => createSelector(selectHomeDomain, subState => subState);
const makeSelectHomeMsg = () => createSelector(selectHomeDomain, subState => subState.msg);

export default makeSelectHome;
export { makeSelectHome, makeSelectHomeMsg };
