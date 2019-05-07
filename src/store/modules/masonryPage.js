import { createAction, handleActions } from 'redux-actions';

// const GET_REQUESTED = 'masonry/GET_REQUESTED';
// const GET_SUCCEEDED = 'masonry/GET_SUCCEEDED';
// const GET_FAILED = 'masonry/GET_FAILED';
const MORE_TRUE = 'masonryPage/MORE_TRUE';

// export const getRequested = createAction(GET_REQUESTED);
export const moreTrue = createAction(MORE_TRUE);

const initialState = { 
  more: false,
};

export default handleActions({
  [MORE_TRUE]: (state, action) => {
    return {
      ...state,
      more: true
    }
  }
}, initialState);