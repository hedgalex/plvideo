import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Spinner } from '~components/Spinner';
import { useCardSourceDetailsQuery } from '~app/queries/useCardSourceDetailsQuery';
import { SourceDetailsList } from './SourceDetailsList';
import { BackButton, Container, Wrapper } from '../styles';

interface DetailsProps {
  cardId: number;
  sourceId: number | null;
  onBackClick: () => void;
}

export const Details: React.FC<DetailsProps> = ({ cardId, sourceId, onBackClick }) => {
  const { data, isLoading, isFetched } = useCardSourceDetailsQuery({ cardId, sourceId });
  return (
    <Wrapper>
      <BackButton onClick={onBackClick}>
        <ExpandMoreIcon />
      </BackButton>

      <Container center={isLoading}>
        <Spinner isVisible={isLoading} />
        {isFetched && <SourceDetailsList items={data?.items} />}
      </Container>
    </Wrapper>
  );
};
