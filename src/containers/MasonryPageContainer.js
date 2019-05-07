import React, { Component } from 'react';
import MasonryPage from '../components/Content/MasonryPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as masonryActions from '../store/modules/masonry';
import * as masonryPageActions from '../store/modules/masonryPage';
import { MasonryActions, MasonryPageActions } from '../store/actionCreators';

class MasonryPageContainer extends Component {
  
  getRequested = () => {
    MasonryActions.getRequested();
  }

  moreTrue = () => {
    MasonryPageActions.moreTrue();
    MasonryActions.getRequested();
  }
  
  render() {
    console.log('page container', this.props)
    const { more, loading } = this.props;
    return (
      <MasonryPage getRequested={this.getRequested} more={more} moreTrue={this.moreTrue} loading={loading}/>
      
    )
  }
}

export default connect(
  ({masonryPage, masonry}) => ({
    // dataSet: masonry.dataSet,
    // config: masonry.config
    // input: todo.get('input'),
    // todos: todo.get('todos')

    // Record를 이용할 때
    // input: todo.input,
    // todos: todo.todos
    more: masonryPage.more,
    loading: masonry.config.loading
  }),
  (dispatch) => ({
    MasonryActions: bindActionCreators(masonryActions, dispatch),
    MasonryPageActions: bindActionCreators(masonryPageActions, dispatch)
  })
)(MasonryPageContainer);