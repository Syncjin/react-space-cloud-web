import React from 'react';
import styled, {css} from 'styled-components';
import Logo from './Logo';
import { blue } from '../../styles/utils';
import Icon from './Icon';

const HeaderWrapper = styled.div`
  background: ${blue};
  height: 100px;
  width: 100%;
  position: relative;
`;

const MdSearchClick = () => {
  console.log('MdSearch click')
}
const MeMenuClick = () => {
  console.log('MeMenu click')
}

const IconWrapper = styled.div`
  width: 200px;
  height: 100px;
  float: right;
  text-align: center;
`;

const TableWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;

const TableCellWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <IconWrapper>
        <TableWrapper>
          <TableCellWrapper>
            <Icon icon={'MdSearch'} onclick={MdSearchClick}/>
            <Icon icon={'MdMenu'} onclick={MeMenuClick}/>
          </TableCellWrapper>
        </TableWrapper>
      </IconWrapper>
    </HeaderWrapper>
  )
}

export default Header;