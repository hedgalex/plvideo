import { Box } from '@mui/material';
import { EShowTypes } from '~shared/.consts';

import { Content, Header } from '~app/content/styles';
import { useShowPage } from './useShowPage';
import { RatingList } from './RatingList';
import { Spinner } from '~components/Spinner';

interface IListPageProps {
  type: EShowTypes;
}

export const ListPage: React.FC<IListPageProps> = ({ type }) => {
  const { isLoading, title, items, handleTitleClick } = useShowPage(type);
  return (
    <Content>
      <Header variant="h1">{title}</Header>
      {isLoading && (
        <Box textAlign="center" marginTop="100px">
          <Spinner size={60} weight={5} />
        </Box>
      )}
      {!isLoading && <RatingList items={items} onTitleClick={handleTitleClick} />}
    </Content>
  );
};
