import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Content from './Content';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import NavContainer from '../containers/NavContainer';
import MyInfo from './MyInfo';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 8888;
  top: 0;
`;


class App extends Component {
  
  state = {
    show: true
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        show: false
      })
    }, 10000);
  }

  render() {
    return (
      <div className="App">
        <Router>
          {this.state.show ? <MyInfo /> : null }
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
