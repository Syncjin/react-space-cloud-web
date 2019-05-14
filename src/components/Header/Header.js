import React from 'react';
import styled, {css} from 'styled-components';
import Logo from './Logo';
import { blue } from '../../styles/utils';
import Icon from './Icon';

const HeaderWrapper = styled.div`
  background: ${blue};
  height: 80px;
  width: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  width: 150px;
  height: 80px;
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

const Header = ({ searchClick, menuClick }) => {
  return (
    <HeaderWrapper>
      <Logo />
      <IconWrapper>
        <TableWrapper>
          <TableCellWrapper>
            <Icon icon={'MdSearch'} onclick={(e) => {searchClick('search click')}} />
            <Icon icon={'MdMenu'} onclick={(e) => {menuClick('menu click')}}/>
          </TableCellWrapper>
        </TableWrapper>
      </IconWrapper>
    </HeaderWrapper>
  )
}

export default Header;