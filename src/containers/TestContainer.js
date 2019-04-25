import React, { Component } from 'react';
import Test from '../components/Test';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../store/modules/test';
import { TestActions } from '../store/actionCreators';

class TestContainer extends Component {
  
  testPlus = () => {
    TestActions.getRequested();
  }

  render() {
    const {number, api, loading} = this.props;
    const { testPlus } = this;

    console.log('test container', this.props)
    return (
      <div>
        <Test number={number} testPlus={testPlus}/>
        {loading === true ? <p>loading...</p> : loading}
        {api !== null ? <p>item {api} </p> : api}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    number: state.test.number,
    api: state.test.api,
    loading: state.test.loading
    // input: todo.get('input'),
    // todos: todo.get('todos')

    // Record를 이용할 때
    // input: todo.input,
    // todos: todo.todos
  }),
  (dispatch) => ({
    TestActions: bindActionCreators(testActions, dispatch)
  })
)(TestContainer);