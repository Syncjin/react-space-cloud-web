import { createAction, handleActions } from 'redux-actions';

const HANDLE_NEXT = 'slide/HANDLE_NEXT';
const HANDLE_PREV = 'slide/HANDLE_PREV';
const GET_REQUESTED = 'slide/GET_REQUESTED';
const GET_SUCCEEDED = 'slide/GET_SUCCEEDED';
const GET_FAILED = 'slide/GET_FAILED';

export const handleNext = createAction(HANDLE_NEXT, val => val);
export const handlePrev = createAction(HANDLE_PREV);
export const getRequested = createAction(GET_REQUESTED);

const initialState = {
  config: {
    imageList: [],
    responseList: [],
    responseCnt: 5,
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null,
    level: 0,
    auto: true,
    setAuto: null,
  }
  
}

export default handleActions({
  [HANDLE_NEXT]: (state, action) => {
    if(action.payload !== undefined) {
      return {
        ...state,
        config: {
          ...state.config,
          level: action.payload
        }
      }
    }
    return {
      ...state,
      config: {
        ...state.config,
        level: state.config.level + 1
      }
    }
  },
  [HANDLE_PREV]: (state, action) => {
    console.log(state.config.level - 1)
    return {
      ...state,
      config: {
        ...state.config,
        level: state.config.level - 1
      }
    }
  },
  [GET_REQUESTED]: (state, action) => {
    console.log('get requested');
    return {
      ...state,
      config: {
        ...state.config,
        loading: true
      }
    }
  },
  [GET_SUCCEEDED]: (state, action) => {
    console.log('get succeeded');
    return {
      ...state,
      config: {
        ...state.config,
        responseList: action.payload,
        loading: false,

      }
    }
  },
  [GET_FAILED]: (state, action) => {
    console.log('get failed');
    return {
      ...state,
      config: {
        ...state.config,
        loading: false
      }
    }
  },
}, initialState);