import React from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import SlideContainer from '../../containers/SlideContainer'
import Page from './Page';
import PageContainer from '../../containers/PageContainer';

const ContentWrapper = styled.div`
  display: block;
  width: 100%;
  height: auto;
  background: #fff;
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

const TestDiv = styled.div`
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 15px;
  &:hover {
    background: blue;
  }
`;

const Test = () => {
  return <SlideContainer />
}

const Index = () => {
  return <PageContainer />
}

const Content = () => {
  
  
  return (
    <ContentWrapper>
      {/* <SlideContainer /> */}
      <Route path="/" exact component={Index} />
      <Route path="/newLink" component={Test} />
    </ContentWrapper>
  )
}

export default Content;