import { Box, Typography, typographyClasses } from '@mui/material';

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

  @media only screen and (max-width: 768px) {
    display: block;
    margin: 0;
    width: 100vw;
    box-shadow: none;
    border-radius: 0;
    min-height: 100vh;
  }
`;

export const Nav = styled.div`
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px 0 0 20px;
  border-right: 1px solid #e9e9ec;
  outline-right: 1px solid #fafbfc;

  @media only screen and (max-width: 768px) {
    padding: 0;
    display: flex;
    justify-content: center;
    border-radius: 0;
    border-right: 0px;
    outline-right: 0px;
    margin: 0 auto;
  }
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

  @media only screen and (max-width: 768px) {
    margin: 10px;
  }
`;

export const NavTitle = styled(Box)`
  margin-top: 2px;
  margin-left: 20px;

  @media only screen and (max-width: 768px) {
    display: none;
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

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  flex-grow: 1;
  padding: 40px;
  border-radius: 0 20px 20px 0;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    border: 0;
    padding: 5px;
    max-width: 100%;
  }
`;

export const Header = styled(Typography)`
  padding-top: 20px;
  padding-bottom: 72px;

  &.${typographyClasses.h1} {
    font-size: 32px;
  }

  @media only screen and (max-width: 768px) {
    padding-bottom: 20px;

    &.${typographyClasses.h1} {
      font-size: 20px;
      text-align: center;
    }
  }
`;

export const PageContent = styled.div`
  padding-top: 75px;

  @media only screen and (max-width: 768px) {
    padding-top: 40px;
  }
`;
