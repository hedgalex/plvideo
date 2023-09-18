import { PropsWithChildren } from 'react';
import { CardStyles } from './styles';

const { Wrapper, Container, Progress } = CardStyles;

export interface CardProps {
  className?: string;
  progress?: number;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({ children, progress, className }) => {
  return (
    <Wrapper className={className}>
      <Progress className="card-progress" progress={progress}>
        <Container className="card-container">{children}</Container>
      </Progress>
    </Wrapper>
  );
};
