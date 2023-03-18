import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IState, useAppDispatch } from '~store/index';
import { searchAction } from '~store/pageSlice';
import { Input } from '~components/input/styles';
import { Episode } from '~components/episode';
import { getHashParams } from '~components/episodes/utils';
import { EResource, EShowTypes } from '~shared/.consts';
import { IPageListResult, IShowItem } from '~shared/.ifaces';
import { ProgressLoader } from '~app/styles';
import { Content, Header } from '~app/content/styles';
import { SearchContainer, StyledChip } from './styles';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { hash = '#' } = useLocation();
  const { text = '', source = EResource.IMDB } = getHashParams(decodeURIComponent(hash));
  const [searchText, setSearchText] = useState<string>('');
  const [activeResource, setActiveResource] = useState<EResource>(EResource.IMDB);

  const { isLoading, data } = useSelector((state: IState) => state.page);
  const { items = [] } = data as IPageListResult<IShowItem>;

  useEffect(() => {
    setSearchText(text);
    setActiveResource(source as EResource);
    if (text.length > 2) {
      dispatch(searchAction({ searchText: text, resource: source as EResource }));
    }
  }, [text, source]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      navigate(`#text=${encodeURIComponent(event?.target?.value ?? '')}&source=${activeResource}`);
    },
    [activeResource],
  );

  const handleChipClick = useCallback(
    (newSource: EResource) => () => {
      navigate(`#text=${encodeURIComponent(searchText)}&source=${newSource}`);
    },
    [searchText],
  );

  return (
    <Content>
      <Header variant="h1">Search</Header>
      <SearchContainer>
        <Box>
          <Input variant="outlined" size="small" value={searchText} onChange={handleChange} />
        </Box>
        <Stack direction="row" spacing="5px" mt="8px">
          <StyledChip
            isSelected={activeResource === EResource.IMDB}
            className="chip-label"
            size="small"
            label="IMDB"
            onClick={handleChipClick(EResource.IMDB)}
          />
          <StyledChip
            isSelected={activeResource === EResource.ORORO}
            className="chip-label"
            size="small"
            label="ORORO"
            onClick={handleChipClick(EResource.ORORO)}
          />
          <StyledChip
            isSelected={activeResource === EResource.AC}
            className="chip-label"
            size="small"
            label="AC"
            onClick={handleChipClick(EResource.AC)}
          />
        </Stack>
      </SearchContainer>
      {isLoading && <ProgressLoader loading />}
      {!isLoading &&
        items.map((item) => (
          <Episode
            id={item.id}
            showId={item.id}
            key={item.resourceShowId}
            title={item.title}
            subtitle={item.type === EShowTypes.MOVIE ? 'Movie' : 'TVShow'}
            image={item.image}
            resources={[activeResource]}
            resourceShowId={item.resourceShowId}
          />
        ))}
    </Content>
  );
};
