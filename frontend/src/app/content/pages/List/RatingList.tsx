import { ShowCardList } from '~app/components/ShowCardList';
import { IShowItem } from '~shared/.ifaces';
import { ShowCard } from '~app/components/ShowCard';

interface SearchResultProps {
  items: IShowItem[];
  onTitleClick?: (id: number) => void;
}

export const RatingList: React.FC<SearchResultProps> = ({ items, onTitleClick }) => {
  return <ShowCardList items={items} ItemComponent={ShowCard} onTitleClick={onTitleClick} />;
};
