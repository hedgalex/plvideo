import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(`
	& .${tooltipClasses.tooltip} {
		background: transparent;
	}
`);
