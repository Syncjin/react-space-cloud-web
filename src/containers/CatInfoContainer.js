import React, { Component } from 'react';
import CatInfo from '../components/CatInfo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as catInfoActions from '../store/modules/catInfo';
import { CatInfoActions } from '../store/actionCreators';

class CatInfoContainer extends Component {
  
  getRequested = num => {
    CatInfoActions.getRequested(num);
  }

  render() {
    const { imageData, loading, paramKey } = this.props;
    return (
      <CatInfo imageData={imageData} loading={loading} paramKey={paramKey}
        getRequested={this.getRequested}
      />
      
    )
  }
}

export default connect(
  ({catInfo}) => ({
    imageData: catInfo.imageData,
    loading: catInfo.loading,
    
  }),
  (dispatch) => ({
    CatInfoActions: bindActionCreators(catInfoActions, dispatch)
  })
)(CatInfoContainer);