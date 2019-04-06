import React from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import Slide from '../Slide.js';
import Page from './Page';

const ContentWrapper = styled.div`
  display: block;
  width: 100%;
  height: auto;
  background: green;
  poisition: relative;
  h2 { margin: 0; }
  padding-top: 200px;
  @media ${device.tablet} {
    padding-top: 200px;
  }
  @media ${device.laptop} {
    padding-top: 100px;
  }
`;



const Test = () => {
  return <h2>TEST</h2>
}

const Index = () => {
  return <Page />
}

const Content = () => {
  
  
  return (
    <ContentWrapper>
      <Slide />
      <Route path="/" exact component={Index} />
      <Route path="/test" component={Test} />
    </ContentWrapper>
  )
}

export default Content;