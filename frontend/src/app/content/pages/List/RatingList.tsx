import { CardList } from '~components/CardList';
import { IShowItem } from '~shared/.ifaces';
import { ShowCard } from '~components/ShowCard';

interface SearchResultProps {
  items: IShowItem[];
}

export const RatingList: React.FC<SearchResultProps> = ({ items }) => {
  return <CardList items={items} ItemComponent={ShowCard} />;
};
