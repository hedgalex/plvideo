import { useCardSourcesQuery } from '~app/queries/useCardSourcesQuery';
import { EResource } from '~shared/.consts';
import { Spinner } from '~components/Spinner';
import { ErrorMessage } from '~components/ErrorMessage';
import { SourceList } from './SourceList';
import { Container, Wrapper } from '../../styles';

interface SourcesProps {
  cardId: number;
  onSelect: (sourceId: number) => void;
}

export const Sources: React.FC<SourcesProps> = ({ cardId, onSelect }) => {
  const { data: sources = {}, isFetched, isLoading, isError, refetch } = useCardSourcesQuery({ cardId });
  return (
    <Wrapper>
      <Container center={isLoading || isError}>
        <Spinner isVisible={isLoading} />
        <ErrorMessage isVisible={!isLoading && isError} refetch={refetch} message="Something went wrong" />
        {isFetched &&
          Object.keys(sources).map((key) => (
            <SourceList key={key} type={key as EResource} items={sources[key]} onClick={onSelect} />
          ))}
      </Container>
    </Wrapper>
  );
};
