import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.location);

const selectGlobal = state => state.global;

const makeSelectLoginStatus = () =>
  createSelector(selectGlobal, routerState => routerState.loginStatus);

export { makeSelectLocation, makeSelectLoginStatus };
