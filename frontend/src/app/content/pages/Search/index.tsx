import { Box } from '@mui/material';
import { Input } from '~components/input/styles';

import { Content, Header } from '~app/content/styles';
import { SearchResult } from './SearchResult';
import { useSearchPage } from './useSearchPage';
import { Spinner } from '~components/Spinner';

export const SearchPage: React.FC = () => {
  const { isLoading, text, items, onChange } = useSearchPage();
  return (
    <Content>
      <Header variant="h1">Search</Header>
      <Box mb="50px">
        <Input variant="outlined" size="small" value={text} onChange={onChange} />
      </Box>
      {isLoading && (
        <Box textAlign="center" marginTop="100px">
          <Spinner size={60} weight={5} />
        </Box>
      )}
      {!isLoading && <SearchResult items={items} />}
    </Content>
  );
};
