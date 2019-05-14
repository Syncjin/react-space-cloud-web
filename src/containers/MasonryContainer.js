import React, { Component } from 'react';
import MyMasonry from '../components/Masonry';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as masonryActions from '../store/modules/masonry';
import { MasonryActions } from '../store/actionCreators';

// let num = 0;

class MasonryContainer extends Component {
  
  // getRequested = num => {
  //   MasonryActions.getRequested(num);
  // }

  render() {
    // console.log('masonryContainer', this.props)
    const { dataSet, config } = this.props;
    return (
      <MyMasonry dataSet={dataSet} config={config}
        // getRequested={this.getRequested}
      />
      
    )
  }
}

export default connect(
  ({masonry}) => ({
    dataSet: masonry.dataSet,
    config: masonry.config
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