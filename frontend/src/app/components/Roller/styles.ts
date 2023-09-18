import styled from 'styled-components';

export const PageStyles = styled.div`
  &:nth-child(1) {
  }

  &:nth-child(2) {
  }
`;

export const RollerStyles = styled.div<{ position: number }>(
  ({ position }) => `
  position: relative;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;

  & > div {
    display: flex;
    width: 200%;
    height: 100%;  
    transform: translateX(${position === 0 ? '0' : '-50%'});
    transition: transform 0.3s ease-in-out;
    box-sizing: border-box;

    & > div {
      width: 100%;
      height: 100%;  
    }
  }
`,
);
