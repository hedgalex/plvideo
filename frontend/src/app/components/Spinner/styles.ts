import styled from 'styled-components';

export const SpinnerElement = styled.div<{
  size?: number;
  weight?: number;
}>(
  ({ weight, size, theme }) => `
  text-align: center;
  display: inline-block;
  border: ${weight}px solid rgba(132, 132, 132, 0.2);
  border-radius: 50%;
  border-top-color: ${theme?.colors.palette.primary_200};
  width: ${size}px;
  height: ${size}px;
  transition: opacity 250ms;
  animation: rotateSpinner 1s linear;
  animation-iteration-count: infinite;
  opacity: 1;
`,
);
