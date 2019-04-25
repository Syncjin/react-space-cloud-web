import React, { Component } from 'react';
import styled, {css} from 'styled-components';

const IconDiv = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: inline-block;
  z-index: 20;
  position: absolute;
  ${props => props.align === 'right' &&
    css`float: right;`
  };

  svg {
    ${props => props.color && 
      css`color: ${props.color};`
    }
    width: 100%;
    height: 100%;
  }
`;

const Icon = ({align, icon, onclick, color}) => {
  return (
    <IconDiv align={align} onClick={onclick} color={color}>
      {icon}
    </IconDiv>
  )
}

export default Icon;