import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { Motion, spring } from 'react-motion';
import * as Md from 'react-icons/md';
import { blue, normal, white, ActBlue } from '../../styles/utils';

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${blue};
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 9999;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  background: #fff;
  svg {
    width: 30px;
    height: 30px;
    color: ${blue};
  }
  &: hover {
    box-shadow: 0 0.5em 0.5em -0.4em ${ActBlue};
    transform: translateY(-0.25em);
  }
`;

class FloatingButton extends Component {
 

  constructor(props){
    super(props);
    this.state = {
      isHover: false
    }
    this.springConfig = {
      stiffness: 150, damping: 20
    }
    this._hoverHandle = this._hoverHandle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log('//////////// floating should');
    // console.log(nextProps, nextState);
    // console.log(this.props, this.state);
    if(this.props.ani !== nextProps.ani){
      return true;
    }
    if(this.state.isHover !== nextState.isHover){
      return true;
    }
    
    return false;
  }


  _hoverHandle(flag) {
    this.setState({ isHover: flag})
  }

  _transXInterpolation = () => {
    const {ani} = this.props;
    return ani ? 25 : 0;
  }

  _transYInterpolation = () => {
    const {ani} = this.props;
    const {isHover} = this.state;

    if(isHover) {
      return 20;
    } else if(!ani) {
      return 0;
    } else if(ani) {
      return 25;
    }
  }

  _onToTop = () => {
    window.scrollTo(0, 0);
  }

  render() {
    const {ani} = this.props;
    console.log('render top')
    return (
      <Motion
        style={{
          size: spring(ani ? 50 : 0, this.springConfig),
          transX: spring(this._transXInterpolation(), this.springConfig),
          transY: spring(this._transYInterpolation(), this.springConfig),
          opacity: spring(ani ? 1 : 0, this.springConfig)
        }}
      >
        {({size, transX, transY, opacity}) => 
          <Wrapper
            onMouseOver={this._hoverHandle.bind(null, true)}
            onMouseOut={this._hoverHandle.bind(null, false)}
            onClick={this._onToTop}
            style={{
              WebkitTransform: `translate3d(${transX}px, ${transY}px, 0)`,
              transform: `translate3d(${transX}px, ${transY}px, 0)`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: `${opacity}`,
          }}>
            <Md.MdArrowDropUp />
          </Wrapper>
        }
      </Motion>
    )
  }

}

export default FloatingButton;
