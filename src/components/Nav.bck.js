import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { NavDiv, NavMenu, NavMenuItem, NavMenuItemLink, NavMenuItemLinkChild, NavMenuItemLinkChildLink,DivTableCenter} from './StyledComponent';




class Nav extends Component {

  state = {
    
  }
  mouseFunc = () => {
    // hover change
  }
  render() {
    const { navMenu, active, hover } = this.props;
    return (
    <NavDiv>
      <NavMenu>
        {navMenu.map((o, i) => {
          let activeValue = active === i ? true : false;
          return (
            <NavMenuItem key={i}>
              <DivTableCenter>
                <NavMenuItemLink active={activeValue} onMouseEnter={this.mouseFunc}>{o.title}
                {o.child.lenght === 0 ? (null) : <NavMenuItemLinkChild>
                  {o.child.map((child, index) => {
                    return (
                      <NavMenuItemLinkChildLink key={index}>{child}</NavMenuItemLinkChildLink>
                    )
                  })}
                </NavMenuItemLinkChild>}
                </NavMenuItemLink>
              </DivTableCenter>
            </NavMenuItem>
          )
        })}
      </NavMenu>
    </NavDiv>
    )
  }
};

Nav.defaultProps = {
  active: 0,
  navMenu: [
    {title: 'hello1', child:['1','2','3'], hover: false},
    {title: 'hello2', child:['1','2','3'], hover: false},
    {title: 'hello3', child:['1','2','3'], hover: false}
  ]
}


export default Nav;