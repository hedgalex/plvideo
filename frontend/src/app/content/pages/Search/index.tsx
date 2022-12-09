import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IState, useAppDispatch } from '~store/index';
import { searchAction } from '~store/pageSlice';
import { Input } from '~components/input/styles';
import { Episode, ISearchResultItem } from '~components/episode';
import { Loader } from '~app/styles';
import { Content, Header } from '~app/content/styles';
import { SearchContainer, StyledChip } from './styles';
import { EServices, EShowTypes } from '~shared/.consts';
import { IPageSearchResult } from '~shared/.ifaces';

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const hash = location.hash.replace(/#/, '');
  const [searchText, setSearchText] = useState<string>();
  const [activeService, setActiveService] = useState<EServices>(EServices.IMDB);

  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IPageSearchResult;

  useEffect(() => {
    setSearchText(hash);
    if (hash.length > 2) {
      dispatch(searchAction({ searchText: hash, service: activeService }));
    }
  }, [hash, activeService]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    navigator(`#${event?.target?.value}` ?? '');
  };

  const handleChipClick = (name: EServices) => () => {
    setActiveService(name);
  };

  return (
    <Content>
      <Header variant="h1" fontSize="32px">
        Search
      </Header>
      <SearchContainer>
        <Box>
          <Input variant="outlined" size="small" value={searchText} onChange={handleChange} />
        </Box>
        <Stack direction="row" spacing="5px" mt="8px">
          <StyledChip
            isActive={activeService === EServices.IMDB}
            size="small"
            label="IMDB"
            onClick={handleChipClick(EServices.IMDB)}
          />
          <StyledChip
            isActive={activeService === EServices.ORORO}
            size="small"
            label="ORORO"
            onClick={handleChipClick(EServices.ORORO)}
          />
          <StyledChip
            isActive={activeService === EServices.AC}
            size="small"
            label="AC"
            onClick={handleChipClick(EServices.AC)}
          />
        </Stack>
      </SearchContainer>
      {isLoading && <Loader />}
      {!isLoading &&
        items.map((item: ISearchResultItem) => (
          <Episode {...item} subtitle={item.type === EShowTypes.MOVIE ? 'Movie' : 'TVShow'} />
        ))}
    </Content>
  );
};
