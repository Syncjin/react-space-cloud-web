import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Content from './Content';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import NavContainer from '../containers/NavContainer';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 9999;
  top: 0;
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
      </div>
    );
  }
}

export default App;
