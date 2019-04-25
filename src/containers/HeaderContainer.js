import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerActions from '../store/modules/header';
import { HeaderActions } from '../store/actionCreators';

class HeaderContainer extends Component {
  
  searchClick = (text) => {
    HeaderActions.searchClick(text);
    HeaderActions.printMessage();
  }

  menuClick = (text) => {
    HeaderActions.menuClick(text);
    HeaderActions.printMessage();
  }
  
  render() {
    const { searchClick, menuClick } = this;
    return (
      <Header searchClick={searchClick} menuClick={menuClick}>
      </Header>
      
    )
  }
}

export default connect(
  ({header}) => ({
    message: header.message
  }),
  (dispatch) => ({
    HeaderActions: bindActionCreators(headerActions, dispatch)
  })
)(HeaderContainer);