import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';
import { blue, ActBlue } from '../../styles/utils';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import SlideNavigator from './SlideNavigator';
import SlideItem from './SlideItem';

import axios from 'axios';

const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background: black;
  position: relative;
`;

class Slide extends Component {
 
  state = {
    imageList: [],
    responseList: [],
    responseCnt: 5,
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null,
    level: 0,
    auto: true
  }

  getApi = async () => {
    if(this.state.loading) return;
    this.setState({loading: true});
    try {
      // let response = await axios.get('https://api.unsplash.com/photos/random?client_id=3e3e2a7b7de3858240006b98d9fcbe37671348d15e9844c421d4e66158325ac5&count=5');
      // console.log(response)
      // this.setState({ responseList: response.data });
      this.setState({responseList: [0,1,2,3,4,5]})
    } catch (e) {
      console.log(e);
    }
    this.setState({loading: false});
  }

  autoNext = () => {
    this.setAuto = setInterval(() => {
      if(this.state.level === this.state.responseCnt - 1){
        this.setState({level: 0})
      } else {
        this.setState({level: this.state.level + 1})
      }
    }, 3000);
  }

  handlePrev = () => {
    if(this.state.level !== 0){
      this.setState({level: this.state.level - 1})
    }
  }

  handleNext = () => {
    if(this.state.level !== this.state.responseCnt - 1) {
      this.setState({level: this.state.level + 1})
    }
  }

  componentDidMount(){
    console.log(this.state)
    this.getApi();
    this.autoNext();
  }

  componentWillUnmount(){
    clearInterval(this.setAuto);
  }

  render() {
    const { responseList, loading, level} = this.state;
    const {handleNext, handlePrev} = this;
    return (
      <Wrapper>
        <SlideNavigator onNext={handleNext} onPrev={handlePrev} />
        <SlideItem responseList={responseList} loading={loading} level={level}/>
      </Wrapper>
    )
  }

}



export default Slide;
