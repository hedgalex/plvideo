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
  border: Record<'santasGray', string>;
  fonts: unknown;
}

export type ITheme = {
  colors: IColors;
  fonts: string[];
  fontSizes: IFonts;
};

export type IGlobalTheme<T = Record<string, unknown>> = T & {
  theme?: ITheme;
  theme2?: ITheme;
};

const colors = {
  white: '#FFFFFF',
  primary_50: '#f0f7ff',
  catskillWhite: '#E6EAF3',
  athensGray: '#F5F6F9',
  watusi: '#FFD6CE',
  melrose: '#C7BAFF',
  inactive: '#CCCCCC',
  santasGray: '#A0A2AF',
  boulder: '#7B7B7B',

  blue_1: '#E6F7FF',
  blue_2: '#BAE7FF',
  blue_3: '#91D5FF',
  blue_4: '#69C0FF',
  blue_5: '#40A9FF',
  blue_6: '#1890FF',
  blue_7: '#096DD9',
  blue_8: '#0050B3',
  blue_9: '#003A8C',
  blue_10: '#002766',
  blue_11: '#011B4A',

  gray_1: '#FFFFFF',
  gray_2: '#FAFAFA',
  gray_3: '#F5F5F5',
  gray_4: '#E8E8E8',
  gray_5: '#D9D9D9',
  gray_6: '#BFBFBF',
  gray_7: '#8C8C8C',
  gray_8: '#595959',
  gray_9: '#262626',
  gray_10: '#000000',
  gray_11: '#999999',

  red_1: '#fff1f0',
  red_2: '#ffccc7',
  red_3: '#ffa39e',
  red_4: '#ff7875',
  red_5: '#ff4d4f',
  red_6: '#f5222d',
  red_7: '#cf1322',
  red_8: '#a8071a',
  red_9: '#820014',
  red_10: '#5c0011',
  red_11: '#f81a25',

  volcano_1: '#fff2e8',
  volcano_2: '#ffd8bf',
  volcano_3: '#ffbb96',
  volcano_4: '#ff9c6e',
  volcano_5: '#ff7a45',
  volcano_6: '#fa541c',
  volcano_7: '#d4380d',
  volcano_8: '#ad2102',
  volcano_9: '#871400',
  volcano_10: '#610b00',

  orange_1: '#fff7e6',
  orange_2: '#ffe7ba',
  orange_3: '#ffd591',
  orange_4: '#ffc069',
  orange_5: '#ffa940',
  orange_6: '#fa8c16',
  orange_7: '#d46b08',
  orange_8: '#ad4e00',
  orange_9: '#873800',
  orange_10: '#612500',
  orange_11: '#E37E12',
  orange_12: '#FEA545',

  green_1: '#f6ffed',
  green_2: '#d9f7be',
  green_3: '#b7eb8f',
  green_4: '#95de64',
  green_5: '#73d13d',
  green_6: '#52c41a',
  green_7: '#389e0d',
  green_8: '#237804',
  green_9: '#135200',
  green_10: '#092b00',
  green_11: '#52C41A',
};

export const theme = {
  colors: {
    ...colors,
    primary: '#4756EA',
    secondary: '#00D0A5',
    alert: '#FF365E',
    bg: {
      catskillWhite: colors.catskillWhite,
      athensGray: colors.athensGray,
      watusi: colors.watusi,
      melrose: colors.melrose,
      inactive: colors.inactive,
    },
    border: {
      santasGray: colors.santasGray,
    },
    fonts: {
      boulder: colors.boulder,
    },
  },
  fonts: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

export const theme2 = {
  colors: { ...colors, primary: '#4756EA', secondary: '#00D0A5', alert: '#FF365E' },
  background: {
    body: {
      primary: colors.primary_50,
      seconary: colors.white,
    },
  },
};
