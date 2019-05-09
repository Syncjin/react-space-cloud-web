import { createAction, handleActions } from 'redux-actions';

const MORE_TRUE = 'masonryPage/MORE_TRUE';
const FLOATING_SHOW = 'masonryPage/FLOATING_SHOW';
const FLOATING_HIDE = 'masonryPage/FLOATING_HIDE';

export const moreTrue = createAction(MORE_TRUE);
export const floatingShow = createAction(FLOATING_SHOW);
export const floatingHide = createAction(FLOATING_HIDE);

const initialState = { 
  more: false,
  floating: false
};

export default handleActions({
  [MORE_TRUE]: (state, action) => {
    return {
      ...state,
      more: true
    }
  },
  [FLOATING_SHOW]: (state, action) => {
    return {
      ...state,
      floating: true
    }
  },
  [FLOATING_HIDE]: (state, action) => {
    return {
      ...state,
      floating: false
    }
  },
}, initialState);