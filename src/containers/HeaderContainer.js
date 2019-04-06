import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerActions from '../store/modules/header';

class HeaderContainer extends Component {
  render() {
    return (
      <Header>
      </Header>
      
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
    HeaderActions: bindActionCreators(headerActions, dispatch)
  })
)(HeaderContainer);