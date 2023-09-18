import { TitleStyles } from '../styles';

const { Wrapper, Text, SubText } = TitleStyles;

interface TitleProps {
  text?: string;
  subText?: string;
}

export const Title: React.FC<TitleProps & React.HTMLProps<HTMLDivElement>> = ({
  text,
  subText,
  className,
  tabIndex,
  onClick,
  onBlur,
}) => {
  return (
    <Wrapper onClick={onClick} className={className} tabIndex={tabIndex} onBlur={onBlur}>
      <Text>{text}</Text>
      <SubText>{subText}</SubText>
    </Wrapper>
  );
};
