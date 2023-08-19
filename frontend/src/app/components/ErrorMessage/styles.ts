import styled from 'styled-components';
import { GlobalTheme } from '~app/theme';

export const ErrorMessageWrapper = styled.div(
  ({ theme }: GlobalTheme) => `
	span {
		display: block;
		font-size: 14px;
	}

	i {
		display: block;
		margin-top: 5px;
		font-size: 12px;
	}

	svg {
		cursor: pointer;
		width: 35px;
		height: 35px;
		color: ${theme?.colors.palette.warning_400};
	}
`,
);
