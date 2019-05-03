import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Nav from './Nav';
import Content from './Content';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import TestContainer from '../containers/TestContainer';
import styled, {css} from 'styled-components';
import NavContainer from '../containers/NavContainer';
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`;


class App extends Component {
  


  render() {
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <HeaderContainer />
            <NavContainer />
          </Wrapper>
          <Content />
        </Router>
        {/* <TestContainer /> */}
      </div>
    );
  }
}

export default App;
