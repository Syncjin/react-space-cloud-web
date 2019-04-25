import React from 'react';
import styled, {css} from 'styled-components';
import Icon from './Icon';
import * as Md from 'react-icons/md';


const IconWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${props => props.align === 'right' && 
    css`
      right: 0px;
    `
  }
`;

const Right = styled.div`
  width: 100px;
  height: 100%;
  background: red;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
`;

const SlideNavigator = ({onNext, onPrev}) => (
    <Wrapper>
      <IconWrapper align={'left'}>
        <Icon icon={<Md.MdChevronLeft />} color={'#ddd'} onclick={onPrev}/>
      </IconWrapper>
      <IconWrapper align={'right'}>
        <Icon icon={<Md.MdChevronRight />} color={'#ddd'} onclick={onNext}/>
      </IconWrapper>
    </Wrapper>
)

export default SlideNavigator;