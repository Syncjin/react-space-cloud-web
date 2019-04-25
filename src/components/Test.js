import React, { Component } from 'react';

import styled, {css} from 'styled-components';
const Wrapper = styled.div`
  // position: absolute;
  width: 300px;
  height: 300px;
  background-color: red;
`;

class Test extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    const { testPlus } = this.props;
    console.log('test component', this.props)
    return (
      <Wrapper onClick={testPlus}>
        Test
      </Wrapper>
    );
  }
}

export default Test;
