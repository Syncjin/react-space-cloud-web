import React, { Component } from 'react';
import MyMasonry from '../components/Masonry/MyMasonry';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as masonryActions from '../store/modules/masonry';

class MasonryContainer extends Component {
  
  masonryListPlus = () => {
    masonryActions.test(this.props.dataSet);
    console.log('masonryListPlus')
  }
  render() {
    return (
      <MyMasonry dataSet={this.props.dataSet}
        masonryListPlus={this.masonryListPlus}
      />
      
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
    MasonryActions: bindActionCreators(masonryActions, dispatch)
  })
)(MasonryContainer);