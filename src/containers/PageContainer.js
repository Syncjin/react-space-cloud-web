import React, { Component } from 'react';
// import MyMasonry from '../components/Masonry';
import Page from '../components/Content/Page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as masonryActions from '../store/modules/masonry';
import { MasonryActions } from '../store/actionCreators';

class PageContainer extends Component {
  
  test = () => {
    MasonryActions.getRequested();
  }
  
  render() {
    console.log('page container', this.props)
    return (
      <Page test={this.test}/>
      
    )
  }
}

export default connect(
  ({masonry}) => ({
    // dataSet: masonry.dataSet,
    // config: masonry.config
    // input: todo.get('input'),
    // todos: todo.get('todos')

    // Record를 이용할 때
    // input: todo.input,
    // todos: todo.todos
  }),
  (dispatch) => ({
    MasonryActions: bindActionCreators(masonryActions, dispatch)
  })
)(PageContainer);