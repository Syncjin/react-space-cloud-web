import { bindActionCreators } from 'redux';
import * as testActions from './modules/test';
import * as navActions from './modules/nav';

import store from './index';

const { dispatch } = store;

export const TestActions = bindActionCreators(testActions, dispatch);
export const NavActions = bindActionCreators(navActions, dispatch);