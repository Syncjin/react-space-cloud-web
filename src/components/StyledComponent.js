import styled, { css } from 'styled-components';
import { blue, ActBlue } from '../styles/utils';

const NavDiv = styled.div`
  width: 100%;
  height: 100%;
  background: ${blue};
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0 20px;
  text-align: center;
  height: 100%;
  margin: 0;
`;

const NavMenuItem = styled.li`
  display: inline-block;
  height: 100%;
  // padding: 30px 0 30px;
  &: hover {
    background: ${ActBlue};
  }
  &: hover a {
    color: #fff;
  }
  // &: hover div {
  //   display: block;
  // }
`;

const DivTableCenter = styled.div`
  display: table;
  height: 100%;
`;

const NavMenuItemLink = styled.a`
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  height: 100%;
  position: relative;
  vertical-align: middle;
  display: table-cell;
  ${props => props.active &&
    css` color: ${ActBlue};`
  };
  
`;

const NavMenuItemLinkChild = styled.div`
  display: none;
  position: absolute;
  background: red;
  z-index:1;
  ${props => props.visible && 
    css`display: block;`
  };
`;

const NavMenuItemLinkChildLink = styled.div`
  text-decoration: none;
  display: block;
  padding: 10px 16px;
  color: black;
`;

export {NavDiv, NavMenu, NavMenuItem, NavMenuItemLink, NavMenuItemLinkChild, NavMenuItemLinkChildLink, DivTableCenter};