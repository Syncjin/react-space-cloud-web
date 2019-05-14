import { createAction, handleActions } from 'redux-actions';

const GET_REQUESTED = 'masonry/GET_REQUESTED';
const GET_SUCCEEDED = 'masonry/GET_SUCCEEDED';
const GET_FAILED = 'masonry/GET_FAILED';

export const getRequested = createAction(GET_REQUESTED);

const initialState = { 
  dataSet: [],
  config: {
    columnWidth: 200, 
    height: 300, 
    gutterSize: 10, 
    overscanByPixels: 0,
    windowScrollerEnabled: false,
    loading: false,
  },
  requestedNum: 0
};

export default handleActions({
  [GET_REQUESTED]: (state, action) => {
    return {
      ...state,
      config: {
        ...state.config,
        loading: true
      }
    }
  },
  [GET_SUCCEEDED]: (state, action) => {
    return {
      ...state,
      dataSet: state.dataSet.concat(action.payload),
      config: {
        ...state.config,
        loading: false
      },
      requestedNum: state.requestedNum + 1
    }
  },
  [GET_FAILED]: (state, action) => {
    return {
      ...state,
      config: {
        ...state.config,
        loading: false
      }
    }
  },
}, initialState);