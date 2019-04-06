import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const LogoDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 200px;
  position: absolute;
  z-index: 20;
  text-align: center;
  display: table;
`;

const LogoA = styled(Link)`
  font-size: 2rem;
  height: 100%;
  display: table-cell;
  color: #333;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
`;

const Logo = () => {
  return (
    <LogoDiv>
      <LogoA to={'/'}>SpaceCloud</LogoA>
    </LogoDiv>
  )
};


export default Logo;