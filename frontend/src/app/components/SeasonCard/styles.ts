import styled from 'styled-components';
import { Title as TitleComponent } from '~components/Card/components/Title';
import { AttachmentContent as AttachmentContentStyle } from '../ShowCard/styles';
import { GlobalTheme } from '~app/theme';
import { SelectedProps } from '~app/styles';
import { Popover } from '@mui/material';
import { TitleStyles } from '../Card/styles';

export const Container = styled.div(
  ({ theme }: GlobalTheme) => `
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 143px;
  min-width: 175px;
  padding: 10px;
  border: 1px solid ${theme?.colors.palette.primary_300};
  box-shadow: 0px 1px 6px ${theme?.colors.palette.primary_100},
    inset 0px 2px 8px ${theme?.colors.palette.secondary_50};

  background: ${theme?.colors.palette.white};
  border-radius: 12px;
`,
);

export const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    border-radius: 12px;
  }
`;

export const Season = styled.div<GlobalTheme<SelectedProps>>(
  ({ theme, isSelected }: GlobalTheme<SelectedProps>) => `
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: ${isSelected ? 'default' : 'pointer'};
  background: ${isSelected ? theme?.colors.palette.primary_50 : theme?.colors.palette.white};
  color: ${isSelected ? theme?.colors.palette.secondary_500 : theme?.colors.palette.secondary_700};

  :hover {
    color: ${theme?.colors.palette.primary_400};
  }
`,
);

export const Title = styled(TitleComponent)(
  ({ theme }: GlobalTheme) => `
  cursor: default;
  margin-left: 45px;
  
  ${TitleStyles.Text} {
    color: ${theme?.colors.palette.primary_600};
  }

  ${TitleStyles.SubText} {
    color: ${theme?.colors.palette.secondary_700};
  }

  :hover {
    ${TitleStyles.Text} {
      color: ${theme?.colors.palette.primary_400};
    }
  }
`,
);

export const AttachmentContent = styled(AttachmentContentStyle)`
  padding: 15px;
`;

export const SeasonLink = styled.div`
  border-radius: 5px;
  border: 1px solid #edc;
  text-align: center;
  padding: 2px 5px;
  margin: 5px 7px;
  width: 100px;
`;
