import React, { Component } from 'react';
import MyMasonry from '../components/Masonry';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as masonryActions from '../store/modules/masonry';
import { MasonryActions } from '../store/actionCreators';

class MasonryContainer extends Component {
  

  render() {
    // console.log('masonryContainer', this.props)
    const { dataSet, config } = this.props;
    return (
      <MyMasonry dataSet={dataSet} config={config} />
      
    )
  }
}

export default connect(
  ({masonry}) => ({
    dataSet: masonry.dataSet,
    config: masonry.config
  }),
  (dispatch) => ({
    MasonryActions: bindActionCreators(masonryActions, dispatch)
  })
)(MasonryContainer);