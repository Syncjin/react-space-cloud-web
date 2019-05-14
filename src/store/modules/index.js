import { combineReducers } from 'redux';
import test from './test';
import header from './header';
import masonry from './masonry';
import nav from './nav';
import slide from './slide';
import masonryPage from './masonryPage';
import catInfo from './catInfo';


export default combineReducers({
  test, header, masonry, nav, slide, masonryPage, catInfo
});