import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Card, CardExtends, CardProps } from '../Card';

interface CardListProps {
  items: (Card & { isOpen?: boolean })[];
  ItemComponent: React.ComponentType<CardProps & CardExtends>;
}

const ListItem = React.memo(({ ItemComponent, item, onExpand }: any) => {
  return <ItemComponent onExpand={onExpand} {...item} />;
});

export const CardList: React.FC<CardListProps> = ({ items, ItemComponent }) => {
  const [list, setList] = useState(items);

  useEffect(() => {
    if (items) {
      setList(items.map((item) => ({ ...item, isOpen: false, preview: item.image })));
    }
  }, [items]);

  const handleExpandClick = useCallback((id: number) => {
    setList((prevList) => prevList.map((item) => (item.id === id ? { ...item, isOpen: !item.isOpen } : item)));
  }, []);

  return (
    <>
      {list?.map((item) => (
        <ListItem key={item.id} item={item} ItemComponent={ItemComponent} onExpand={handleExpandClick} />
      ))}
    </>
  );
};
