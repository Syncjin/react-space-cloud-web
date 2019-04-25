import { createAction, handleActions } from 'redux-actions';

const TEST = 'masonry/TEST';

export const test = createAction(TEST);

const initialState = { dataSet: [] };

export default handleActions({
  [TEST]: ({dataSet}, action) => {
    return { dataSet: dataSet.concat(dataSet) };
  }
}, initialState);