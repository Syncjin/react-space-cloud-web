import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import { device } from '../SizeCheck';
import { blue, ActBlue } from '../../styles/utils';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';

const Wrapper = styled.ul`
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const Item  = styled.li`
  height: 80px;
  // border: 1px solid black;
  display: inline-block;
  margin:0;
  list-style:none;
  vertical-align: middle;
  
  &: hover {
    // background: ${ActBlue};
  }
  &: hover a {
    color: ${ActBlue};
  }
`;

const A = styled.a`
  font-size: 1.2rem;
  color: #FFFFF2;
  display: block;
  text-decoration:none;
  line-height: 77px;
  padding: 0 2rem;
  @media ${device.tablet} {
    padding: 0 2.5rem;
  }
  cursor: pointer;
  ${props => props.active && 
    css`
      border-bottom: 3px solid ${ActBlue};
    `
  }
`;

const LinkA = styled(Link)`
  font-size: 1.2rem;
  color: #FFFFF2;
  display: block;
  text-decoration:none;
  line-height: 77px;
  padding: 0 2rem;
  @media ${device.tablet} {
    padding: 0 2.5rem;
  }
  cursor: pointer;
  ${props => props.active && 
    css`
      border-bottom: 3px solid ${ActBlue};
    `
  }
`;


class NavList extends Component {
 
  render() {
    const {item, hoverTrue} = this.props;
    return (
      <Wrapper>
        {item.map((o,i) => {
          return (
            <Item key={i}>
              {i === 3 ? 
                (<LinkA to="/newLink" active={o.active ? 1 : 0}>{o.text}</LinkA>) : 
                // (<A active={o.active ? 1 : 0} onClick={(e) => {this.renderMain(i)}}>{o.text}</A>)
                (<A active={o.active ? 1 : 0} onClick={(e) => {hoverTrue(i)}}>{o.text}</A>)
              }
              
            </Item>
          )
        })}
      </Wrapper>
    )
  }

}

export default NavList;
