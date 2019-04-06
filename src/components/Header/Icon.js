import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import * as Md from 'react-icons/md';

const IconDiv = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: inline-block;
  z-index: 20;
  position: relative;
  ${props => props.align === 'right' &&
    css`float: right;`
  };

  svg {
    width: 100%;
    height: 100%;
  }
`;

const returnIcon = (icon) => {
  switch (icon) {
    case 'MdMenu': return (<Md.MdMenu />);
    case 'MdSearch': return (<Md.MdSearch />);
    default:
      break;
  }
}

const Icon = ({align, icon, onclick}) => {
  return (
    <IconDiv align={align} onClick={onclick}>
      {returnIcon(icon)}
    </IconDiv>
  )
}
// class Icon extends Component {

//   render() {
//     const { align, icon, onclick } = this.props;
//     return (
//       <IconDiv align={align} onClick={onclick}>
//         {returnIcon(icon)}
//       </IconDiv>
//     )
//   }
// }

export default Icon;