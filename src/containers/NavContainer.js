import React, { Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navActions from '../store/modules/nav';
import { NavActions } from '../store/actionCreators';

class NavContainer extends Component {
  
  hoverTrue = (num) => {
    NavActions.hoverTrue(num);
  }
  
  render() {
    const { hoverTrue } = this;
    const { item } = this.props;
    return (
      <Nav hoverTrue={hoverTrue} item={item}/>
    )
  } 
}

export default connect(
  ({nav}) => ({
    item: nav.item
  }),
  (dispatch) => ({
    NavActions: bindActionCreators(navActions, dispatch)
  })
)(NavContainer);