import { createAction,handleActions } from 'redux-actions';

const SEARCH_CLICK = 'header/SEARCH_CLICK',
      MENU_CLICK = 'header/MENU_CLICK',
      PRINT_MESSAGE = 'header/PRINT_MESSAGE';

      
export const searchClick = createAction(SEARCH_CLICK);
export const menuClick = createAction(MENU_CLICK);
export const printMessage = createAction(PRINT_MESSAGE);

const initialState = { 
  message: '' 
};

export default handleActions({
  [SEARCH_CLICK]: ({message}, action) => {
    return { 
      message: action.payload
    };
  },
  [MENU_CLICK]: ({message}, action) => {
    return { 
      message: action.payload
    };
  },
  [PRINT_MESSAGE]: (state) => {
    window.alert('message! :' + state.message)
    return state
  }

}, initialState);