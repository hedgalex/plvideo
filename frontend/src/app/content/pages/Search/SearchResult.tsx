import { Card } from '~components/Card';
import { CardList } from '~components/CardList';
import { IShowItem } from '~shared/.ifaces';

interface SearchResultProps {
  items: IShowItem[];
}

export const SearchResult: React.FC<SearchResultProps> = ({ items }) => {
  return <CardList items={items} ItemComponent={Card} />;
};
