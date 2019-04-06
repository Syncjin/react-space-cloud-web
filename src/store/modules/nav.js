// import { createAction, handleActions } from 'redux-actions';
// import { Record, List } from 'immutable';

// const HOVER_TRUE = 'nav/HOVER_TRUE';

// export const hover_true = createAction(HOVER_TRUE);

// const initialState = Record({
//   active: 0,
//   navMenu: [
//     {title: 'hello1', child:['1','2','3'], hover: false},
//     {title: 'hello2', child:['1','2','3'], hover: false},
//     {title: 'hello3', child:['1','2','3'], hover: false}
//   ]
// })();

// export default handleActions({
//   [HOVER_TRUE]: ({number}, action) => {
//     return { number: number + 3 };
//   }
// }, initialState);