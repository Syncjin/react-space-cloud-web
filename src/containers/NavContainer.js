import React, { Component } from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navActions from '../store/modules/nav';

class NavContainer extends Component {
  
  
  
  render() {
    return (
      <Nav />
    )
  }
}

export default connect(
  (state) => ({
    // input: todo.get('input'),
    // todos: todo.get('todos')

    // Record를 이용할 때
    // input: todo.input,
    // todos: todo.todos
  }),
  (dispatch) => ({
    NavActions: bindActionCreators(navActions, dispatch)
  })
)(NavContainer);