import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  msg: 'rainbow in paper',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default homeReducer;
