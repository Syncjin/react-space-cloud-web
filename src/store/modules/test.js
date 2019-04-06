import { createAction, handleActions } from 'redux-actions';

const TESTPLUS = 'test/TESTPLUS';

export const testplus = createAction(TESTPLUS);

const initialState = { number: 0 };

export default handleActions({
  [TESTPLUS]: ({number}, action) => {
    return { number: number + 3 };
  }
}, initialState);