import React from 'react';
import styled, {css} from 'styled-components';
import { blue } from '../../styles/utils';
import { device } from '../SizeCheck';
import NavList from './NavList';


const NavWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100px;
  background: ${blue};
  position: relative;
  top: 0px;
  @media ${device.tablet} {
    box-shadow: 0 -5px 5px -5px #333;
  }
  @media ${device.laptop} {
    position: absolute;
  }
`;

const Nav = ({hoverTrue, item}) => {
  
  return (
    <NavWrapper>
      <NavList hoverTrue={hoverTrue} item={item}/>
    </NavWrapper>
  )
}

export default Nav;