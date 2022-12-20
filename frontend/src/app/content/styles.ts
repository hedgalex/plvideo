import { Typography } from '@mui/material';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  min-height: 600px;
  margin: 50px auto;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px #c0c0c0;
`;

export const Nav = styled.div`
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px 0 0 20px;
  border-right: 1px solid #e9e9ec;
  outline-right: 1px solid #fafbfc;
`;

export const NavItem = styled.a`
  display: flex;
  cursor: pointer;
  color: #a6a8b5;
  margin-left: 20px;
  margin-top: 40px;
  text-decoration: none;

  :hover {
    .icon {
      color: #4756ea;
    }

    color: #010101;
  }
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
`;

export const Logo = styled.div`
  height: 80px;
  font-size: 36px;
  padding-top: 37px;
  text-align: center;
`;

export const Content = styled.div`
  max-width: 900px;
  flex-grow: 1;
  padding: 40px;
  border-radius: 0 20px 20px 0;
  box-sizing: border-box;
`;

export const Header = styled(Typography)`
  padding: 20px 0 75px 0;
`;
