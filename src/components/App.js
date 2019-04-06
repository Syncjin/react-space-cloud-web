import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Nav from './Nav';
import Content from './Content.js';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
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
            <Nav />
          </Wrapper>
          <Content />
        </Router>
      </div>
    );
  }
}

export default App;
