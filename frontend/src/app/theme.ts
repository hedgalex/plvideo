export interface IFonts {
  small: string;
  meduim: string;
  large: string;
}

export interface IColors {
  primary: string;
  secondary: string;
  alert: string;
  bg: Record<'catskillWhite' | 'athensGray' | 'watusi' | 'melrose' | 'inactive', string>;
  fonts: unknown;
}

export type ITheme = {
  colors: IColors;
  fonts: string[];
  fontSizes: IFonts;
};

export type IGlobalTheme<T = Record<string, unknown>> = T & {
  theme?: ITheme;
};

export const theme = {
  colors: {
    primary: '#4756EA',
    secondary: '#00D0A5',
    alert: '#FF365E',
    bg: {
      catskillWhite: '#E6EAF3',
      athensGray: '#F5F6F9',
      watusi: '#FFD6CE',
      melrose: '#C7BAFF',
      inactive: '#CCCCCC',
    },
    fonts: {
      boulder: '#7B7B7B',
    },
  },
  fonts: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};
