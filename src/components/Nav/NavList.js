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
  height: 100px;
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
  line-height: 97px;
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
  line-height: 97px;
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
  
  state = {
    item: [
      {text: '추천공간/리뷰', active: false},
      {text: '써 본 사람', active: false},
      {text: '기획전', active: false},
      {text: '공간등록하기', active: false},
    ]
  }

  renderMain = (num) =>{
    
    this.setState({
      item: this.state.item.map((o, i)=> {
        o.active = num === i ? true : false;
        return o;
      })
    })

  }
 
  render() {
    const {item} = this.state;
    return (
      <Wrapper>
        {item.map((o,i) => {
          return (
            <Item key={i}>
              {i === 3 ? 
                (<LinkA to="/newLink" active={o.active ? 1 : 0}>{o.text}</LinkA>) : 
                (<A active={o.active ? 1 : 0} onClick={(e) => {this.renderMain(i)}}>{o.text}</A>)
              }
              
            </Item>
          )
        })}
      </Wrapper>
    )
  }

}

export default NavList;
