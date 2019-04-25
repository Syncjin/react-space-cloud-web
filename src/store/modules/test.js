// import { createAction, handleActions } from 'redux-actions';

// const TESTPLUS = 'test/TESTPLUS';
// const GET_REQUESTED = 'test/GET_REQUESTED';
// const GET_SUCCEEDED = 'test/GET_SUCCEEDED';

// export const testplus = createAction(TESTPLUS);
// export const getRequested = createAction(GET_REQUESTED);
// export const getSucceeded = createAction(GET_SUCCEEDED);

// const initialState = { number: 0, loading: false, api: null };

// export default handleActions({
//   [TESTPLUS]: (state, action) => {
//     // console.log(number + 3)
//     return { ...state, number: state.number + 3 };
//   },
//   [GET_REQUESTED]: (state, action) => {
//     console.log('get api GET_REQUESTED', action);
//     return { ...state, loading: true };
//   },
//   [GET_SUCCEEDED]: (state , action) => {
//     console.log('get api GET_SUCCEEDED', action);
//     return { ...state, api: action.payload.api, loading: false };
//   },
// }, initialState);

const initialState = { number: 0, loading: false, api: null };
const GET_REQUESTED = 'test/GET_REQUESTED';
const GET_SUCCEEDED = 'test/GET_SUCCEEDED';
const GET_FAILED = 'test/GET_FAILED';
export const getRequested = () => ({type: GET_REQUESTED});
export const getSucceeded = () => ({type: GET_SUCCEEDED});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_REQUESTED:
      console.log('start GET_REQUESTED');
      return {
        ...state,
        loading: true
      }
    case GET_SUCCEEDED:
      console.log('start GET_SUCCEEDED');
      return {
        ...state,
        loading: false
      }
    case GET_FAILED:
      console.log('start GET_FAILED');
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}