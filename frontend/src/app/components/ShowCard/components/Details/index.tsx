import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Spinner } from '~components/Spinner';
import { useCardSourceDetailsQuery } from '~app/queries/useCardSourceDetailsQuery';
import { SourceDetailsList } from './SourceDetailsList';
import { BackButton, Container, Wrapper } from '../../styles';

interface DetailsProps {
  cardId: number;
  sourceId: number | null;
  onSelect?: (fileIds: number[]) => void;
  onClickBack: () => void;
}

export const Details: React.FC<DetailsProps> = ({ cardId, sourceId, onSelect, onClickBack }) => {
  const { data, isLoading, isFetched } = useCardSourceDetailsQuery({ cardId, sourceId });
  return (
    <Wrapper>
      <BackButton onClick={onClickBack}>
        <ExpandMoreIcon />
      </BackButton>

      <Container center={isLoading}>
        <Spinner isVisible={isLoading} />
        {isFetched && <SourceDetailsList items={data?.items} onSelect={onSelect} />}
      </Container>
    </Wrapper>
  );
};
