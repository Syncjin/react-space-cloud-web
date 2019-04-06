import { createAction, handleActions } from 'redux-actions';

const TEST = 'header/TEST';

export const test = createAction(TEST);

const initialState = { number: 0 };

export default handleActions({
  [TEST]: ({number}, action) => {
    return { number: number + 3 };
  }
}, initialState);