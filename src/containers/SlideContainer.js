import React, { Component } from 'react';
import Slide from '../components/Slide';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as slideActions from '../store/modules/slide';
import { SlideActions } from '../store/actionCreators';

class SlideContainer extends Component {
  
  autoNext = (ths) => {
    // autoNext
    ths.setAuto = setInterval(() => {
      let { level, responseCnt } = this.props.config;
      if(level === responseCnt - 1) {
        SlideActions.handleNext(0);
      } else {
        SlideActions.handleNext();
      }
    }, 3000);
  }

  autoNextClear = (ths) => {
    clearInterval(ths.setAuto);
  }

  handleNext = () => {
    console.log('handle next')
    const {level, responseCnt } = this.props.config;
    if(level !== responseCnt - 1) {
      SlideActions.handleNext();
    }
  }

  handlePrev = () => {
    console.log('handle prev')
    const {level } = this.props.config;
    if(level !== 0) {
      SlideActions.handlePrev();
    }
  }

  getApi = () => {
    SlideActions.getRequested();
  }

  componentDidMount() {

  }

  render() {
    const { autoNext, handleNext, handlePrev, getApi, autoNextClear } = this;
    const { config } = this.props;
    return (
      <Slide autoNext={autoNext} autoNextClear={autoNextClear} handleNext={handleNext} handlePrev={handlePrev} getApi={getApi} config={config}/>
    )
  }
}

export default connect(
  ({slide}) => ({
    config: slide.config
    // imageList: slide.imageList,
    // responseList: slide.responseList,
    // responseCnt: slide.responseCnt,
    // loading: slide.loading,
    // maxDate: slide.maxDate,
    // date: slide.date,
    // url: slide.url,
    // mediaType: slide.mediaType,
    // level: slide.level,
    // auto: slide.auto,
    // setAuto: slide.setAuto,
  }),
  (dispatch) => ({
    SlideActions: bindActionCreators(slideActions, dispatch)
  })
)(SlideContainer);