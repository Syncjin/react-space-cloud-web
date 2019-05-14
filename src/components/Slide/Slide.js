import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import SlideNavigator from './SlideNavigator';
import SlideItem from './SlideItem';


const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background: black;
  position: relative;
`;



class Slide extends Component {
 
  componentDidMount(){
    this.props.getApi();
    this.props.autoNext(this)
  }

  componentWillUnmount(){
    this.props.autoNextClear(this);
  }

  render() {
    const { handleNext, handlePrev, config } = this.props;
    return (
      <Wrapper>
        <SlideNavigator onNext={handleNext} onPrev={handlePrev} />
        <SlideItem responseList={config.responseList} loading={config.loading} level={config.level}/>
      </Wrapper>
    )
  }

}



export default Slide;
