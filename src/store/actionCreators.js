import { bindActionCreators } from 'redux';
import * as navActions from './modules/nav';
import * as masonryActions from './modules/masonry';
import * as headerActions from './modules/header';
import * as slideActions from './modules/slide';
import * as masonryPageActions from './modules/masonryPage';
import * as catInfoActions from './modules/catInfo';

import store from './index';

const { dispatch } = store;

export const HeaderActions = bindActionCreators(headerActions, dispatch);
export const NavActions = bindActionCreators(navActions, dispatch);
export const MasonryActions = bindActionCreators(masonryActions, dispatch);
export const SlideActions = bindActionCreators(slideActions, dispatch);
export const MasonryPageActions = bindActionCreators(masonryPageActions, dispatch);
export const CatInfoActions = bindActionCreators(catInfoActions, dispatch);