import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { CardExtends } from '../Card/.iface/CardExtends';
import { ShowCardProps } from '../ShowCard';

interface ShowCardListProps {
  items: ShowCardProps[];
  ItemComponent: React.ComponentType<CardExtends>;
  onTitleClick?: (id: number) => void;
}

const ListItem = React.memo(({ ItemComponent, item, onExpand, onTitleClick }: any) => {
  return <ItemComponent onExpand={onExpand} onTitleClick={onTitleClick} {...item} />;
});

export const ShowCardList: React.FC<ShowCardListProps> = ({ items, onTitleClick, ItemComponent }) => {
  const [list, setList] = useState(items);

  useEffect(() => {
    if (items) {
      setList(items.map((item) => ({ ...item, isOpen: false, preview: item.image })));
    }
  }, [items]);

  const handleExpandClick = useCallback((id: number) => {
    setList((prevList) => prevList.map((item) => (item.id === id ? { ...item, isExpanded: !item.isExpanded } : item)));
  }, []);

  return (
    <>
      {list?.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          ItemComponent={ItemComponent}
          onExpand={handleExpandClick}
          onTitleClick={onTitleClick}
        />
      ))}
    </>
  );
};
