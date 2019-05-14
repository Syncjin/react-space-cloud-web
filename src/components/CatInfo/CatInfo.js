import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { Motion, spring } from 'react-motion';
import * as Md from 'react-icons/md';
import { blue, normal, white, ActBlue, gray } from '../../styles/utils';
import Faker from 'faker'
import { DominoSpinner } from 'react-spinners-kit';
import axios from 'axios'

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  background: #fff;
  margin: 32px auto;
  border-radius: 8px;
  box-shadow: rgb(238, 238, 238) 0px 4px 4px;
  position: relative;
`;

const ActionBar = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
`;


const ActionMenu = styled.div`
  width: 40px;
  height: 40px;
  background: transparent;
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  svg {
    width: 40px;
    height: 40px;
    color: rgb(200, 200, 200);
  }
  border-radius: 50%;
  transition: all 0.5s;
  &: hover {
    background: rgba(0,0,0, .06);
  }
  
`;

const ActionRightMenu = styled.div`
  width: 100px;
  height: 40px;
  background: red;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const Content = styled.div`
  position: relative;
  img {
    width: 100%; height: 100%;
  }
`;

const RequestLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  // background: rgba(0,0,0,0.3);
  z-index: 100;
`;



class CatInfo extends Component {
 

  constructor(props){
    super(props);
    this.state = {
      image: null
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.paramKey !== this.props.paramKey){
      this.props.getRequested(nextProps.paramKey);
    }
    return true;
  }

  componentDidMount(){
    this.props.getRequested(this.props.paramKey);
  }
  
  _makeLoading = loading => {
    if(loading){
      return (
      <RequestLoading>
        <DominoSpinner
          size={150}
          color={`${ActBlue}`}
          loading={loading}
        />
      </RequestLoading>);
    } else {
      return null;
    }
  }

  render() {
    const { imageData, loading } = this.props;
    console.log('loading', loading)
    return (
      <Wrapper>
        <ActionBar>
          <ActionMenu>
            <Md.MdMoreHoriz />
          </ActionMenu>
          {/* <ActionRightMenu /> */}
        </ActionBar>
        {loading ? this._makeLoading(loading) : null}
        <Content>
          {loading ? null : <img src={imageData !== null ? imageData.urls.small : null} /> }
        </Content>
      </Wrapper>
    )
  }

}

export default CatInfo;
