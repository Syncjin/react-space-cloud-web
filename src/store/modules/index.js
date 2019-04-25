import { combineReducers } from 'redux';
import test from './test';
import header from './header';
import masorny from './masonry';
import nav from './nav';
import slide from './slide';

export default combineReducers({
  test, header, masorny, nav, slide
});