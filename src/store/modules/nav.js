import { createAction, handleActions } from 'redux-actions';

const HOVER_TRUE = 'nav/HOVER_TRUE';

export const hoverTrue = createAction(HOVER_TRUE);

const initialState = {
  item: [
    {text: '추천공간/리뷰', active: false},
    {text: '써 본 사람', active: false},
    {text: '기획전', active: false},
    {text: '공간등록하기', active: false},
  ]
}

export default handleActions({
  [HOVER_TRUE]: ({item}, action) => {
    const result = item.map((o, i) => {
      o.active = action.payload === i ? true : false;
      return o;
    })
    return {
      item: result
    }
  }
}, initialState);