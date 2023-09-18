import { ShowCardList } from '~app/components/ShowCardList';
import { IShowItem } from '~shared/.ifaces';
import { ShowCard } from '~components/ShowCard';

interface SearchResultProps {
  items: IShowItem[];
}

export const SearchResult: React.FC<SearchResultProps> = ({ items }) => {
  return <ShowCardList items={items} ItemComponent={ShowCard} />;
};
