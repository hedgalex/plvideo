import { EResource } from '~shared/.consts';
import { ISourceItem } from '~shared/.ifaces';
import { Col, IconAc, IconOroro, IconTorrent, SourceListContainer, SourceListItem, SourceListPaper } from '../styles';
import { useEffect } from 'react';

interface SourceListProps {
  type: EResource;
  items: ISourceItem[];
  onClick?: (sourceId: number) => void;
}

export const SourceList: React.FC<SourceListProps> = ({ type, items, onClick }) => {
  useEffect(() => {
    console.info('Render SourceList');
  }, []);

  return (
    <SourceListContainer>
      {type === EResource.ORORO && <IconOroro />}
      {type === EResource.TORRENT && <IconTorrent />}
      {type === EResource.AC && <IconAc />}
      <SourceListPaper>
        {items?.map(({ id = 0, name, peers = -1, seeds = -1, size = '' }) => (
          <SourceListItem key={id}>
            <Col
              type="name"
              onClick={() => {
                onClick?.(id);
              }}
            >
              {name}
            </Col>
            <Col type="size">{size}</Col>
            <Col type="seeds">{seeds > -1 ? seeds : ''}</Col>
            <Col type="peers">{peers > -1 ? peers : ''}</Col>
          </SourceListItem>
        ))}
      </SourceListPaper>
    </SourceListContainer>
  );
};
