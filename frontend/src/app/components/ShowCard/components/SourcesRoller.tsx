import { useCallback, useState } from 'react';
import { Page, Roller } from '~components/Roller';
import { Sources } from './Sources';
import { Details } from './Details';

enum Pages {
  Sources,
  Details,
}

interface SourcesRollerProps {
  cardId: number;
  onSelectSource?: (sourceId: number) => void;
  onSelectFiles?: (sourceId: number, fileIds: number[]) => void;
}

export const SourcesRoller: React.FC<SourcesRollerProps> = ({ cardId, onSelectSource, onSelectFiles }) => {
  const [position, setPosition] = useState<Pages>(Pages.Sources);
  const [sourceId, setSourceId] = useState<number | null>(null);

  const handleSourceSelect = useCallback((sourceId: number) => {
    setPosition((prev) => (prev === Pages.Details ? Pages.Sources : Pages.Details));
    setSourceId(sourceId);
    onSelectSource?.(sourceId);
  }, []);

  const handleFilesSelect = useCallback(
    (fileIds: number[]) => {
      if (sourceId !== null) {
        onSelectFiles?.(sourceId, fileIds);
      }
    },
    [sourceId],
  );

  const handleBackClick = useCallback(() => {
    setPosition(Pages.Sources);
    setSourceId(null);
  }, []);

  return (
    <Roller position={position}>
      <Page>
        <Sources cardId={cardId} onSelect={handleSourceSelect} />
      </Page>
      <Page>
        <Details cardId={cardId} sourceId={sourceId} onSelect={handleFilesSelect} onClickBack={handleBackClick} />
      </Page>
    </Roller>
  );
};
