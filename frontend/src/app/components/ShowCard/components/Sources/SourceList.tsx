import { EResource } from '~shared/.consts';
import { ISourceItem } from '~shared/.ifaces';
import {
  Col,
  IconAc,
  IconOroro,
  IconTorrent,
  SourceListContainer,
  SourceListItem,
  SourceListPaper,
} from '../../styles';

interface SourceListProps {
  type: EResource;
  items: ISourceItem[];
  onClick?: (sourceId: number) => void;
}

export const SourceList: React.FC<SourceListProps> = ({ type, items, onClick }) => {
  return (
    <SourceListContainer>
      {type === EResource.ORORO && <IconOroro />}
      {type === EResource.TORRENT && <IconTorrent />}
      {type === EResource.AC && <IconAc />}
      <SourceListPaper>
        {items?.map(({ id = 0, name, peers = '', seeds = '', size = '' }) => (
          <SourceListItem key={id}>
            <Col
              type="name"
              title={name}
              onClick={() => {
                onClick?.(id);
              }}
            >
              {name}
            </Col>
            <Col type="size">{size}</Col>
            <Col type="seeds">{seeds}</Col>
            <Col type="peers">{peers}</Col>
          </SourceListItem>
        ))}
      </SourceListPaper>
    </SourceListContainer>
  );
};
