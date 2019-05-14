import { createAction, handleActions } from 'redux-actions';

const GET_REQUESTED = 'catInfo/GET_REQUESTED';
const GET_SUCCEEDED = 'catInfo/GET_SUCCEEDED';
const GET_FAILED = 'catInfo/GET_FAILED';

export const getRequested = createAction(GET_REQUESTED);

const initialState = { 
  imageData: null,
  loading: false,
};

export default handleActions({
  [GET_REQUESTED]: (state, action) => {
    console.log('?',action)
    return {
      ...state,
      loading: true,
    }
  },
  [GET_SUCCEEDED]: (state, action) => {
    return {
      ...state,
      imageData: action.payload,
      loading: false,
    }
  },
  [GET_FAILED]: (state, action) => {
    return {
      ...state,
      loading: false,
    }
  },
}, initialState);