import produce from 'immer';
import { DEFAULT_ACTION, LOGIN_STATUS_ACTION } from './constants';

export const initialState = {
  loginStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOGIN_STATUS_ACTION:
        draft.loginStatus = action.loginStatus;
        break;
    }
  });

export default appReducer;
