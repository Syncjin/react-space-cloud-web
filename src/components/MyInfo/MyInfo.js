import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { blue, normal, white, ActBlue, gray } from '../../styles/utils';
import { Motion, spring } from 'react-motion';

const Wrapper = styled.div`
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 9999;
  ${props => props.zIndex === 0 &&
    css`z-index: -1;`
  }
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;

  span { 
    color: #fff;
    font-size: 1.5em;
  }
  span.name { 
    position: absolute;
    transform: translate3d(0, 50px, 0);
    -webkit-transform: translate3d(0, 50px, 0);
  }
`;

const TextCenter = styled.div`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span.texture { 
    ${props => props.borderToggle && 
      css`border-right: 1px solid #fff;`
    }
    padding-right: 3px;
  }
    
`;
class MyInfo extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      text: '',
      resultText: 'Front-End Developer. ',
      intervalNum: 300,
      type: true,
      speed: 70,
      borderToggle: true,
      hide: false
    }
    this.textSetInterval = null;
  }


  render() {
    const { borderToggle, hide } = this.state;
    return (
      <Motion
        style={{
          opacity: spring(hide ? 0 : 1, {stiffness: 150, damping: 50}),
        }}
      >
        {({opacity}) => 
          <Wrapper zIndex={opacity} style={{
            opacity: `${opacity}`
          }}>
            <TextCenter borderToggle={borderToggle}>
              <span className="texture">{this.state.text}</span>
            </TextCenter>
              <span className="name">Woojin Lee</span>
          </Wrapper>
        }
      </Motion>
    )
  }


  _nextText = () => {
    let {text, resultText, type, speed, intervalNum, borderToggle} = this.state;
    if(text.length < resultText.length){
      this.setState({
        text: text + resultText[text.length],
        intervalNum: intervalNum > 100 ? intervalNum - speed : 100,
        borderToggle: !borderToggle
      }, () => {
        this._setInterval();
      })
    } else if(text.length == resultText.length){
      this.setState({
        text: text.substr(0, text.length - 1),
        intervalNum: 50,
        type: false,
        borderToggle: !borderToggle
      }, () => {
        this._setInterval();
      })
    }
  }

  _returnText = () => {
    let {text, resultText, type, speed, intervalNum, borderToggle} = this.state;

    if(type){
      this._nextText();
    } else {
      if(text.length !== 0){
        this.setState({
          text: text.substr(0, text.length - 1),
          intervalNum: 50,
          type: false,
          borderToggle: !borderToggle
        }, () => {
          this._setInterval();
        })
      } else {
        this.setState({
          text: '',
          intervalNum: 300,
          type: true,
          borderToggle: !borderToggle,
          hide: true
        }, () => {
          clearInterval(this.textSetInterval);
        })
      }
    }
    
  }

  _setInterval = () => {
    clearInterval(this.textSetInterval);
    this.textSetInterval = setInterval(() => {
      this._returnText();
    }, this.state.intervalNum);
  }

  componentDidMount(){
    this._setInterval();
  }

  componentWillUnmount(){
    clearInterval(this.textSetInterval);
  }
}

export default MyInfo;
