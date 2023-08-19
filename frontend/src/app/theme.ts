const colors = {
  primary: '#4756EA',
  primary_50: '#F0F7FF',
  primary_100: '#C2E0FF',
  primary_200: '#99CCF3',
  primary_300: '#66B2FF',
  primary_400: '#3399FF',
  primary_500: '#007FFF',
  primary_600: '#0072E5',
  primary_700: '#0059B2',
  primary_800: '#004C99',
  primary_900: '#003A75',
  primary_main: '#007FFF',
  primary_light: '#66B2FF',
  primary_dark: '#0059B2',
  primary_contrastText: '#fff',

  secondary_50: '#f3f6f9',
  secondary_100: '#e5eaf2',
  secondary_200: '#dae2ed',
  secondary_300: '#c7d0dd',
  secondary_400: '#b0b8c4',
  secondary_500: '#9da8b7',
  secondary_600: '#6b7a90',
  secondary_700: '#434d5b',
  secondary_800: '#303740',
  secondary_900: '#1c2025',
  secondary_main: '#dae0e7',
  secondary_contrastText: '#2f3a46',
  secondary_light: '#e1e6eb',
  secondary_dark: '#989ca1',

  white: '#ffffff',

  bright_gray: '#E6EAF3',
  athensGray: '#F5F6F9',
  watusi: '#FFD6CE',
  melrose: '#C7BAFF',
  inactive: '#CCCCCC',
  santas_gray: '#A0A2AF',
  boulder: '#7B7B7B',

  caribbean_green: '#00CC99',

  divider: '#E5EAF2',
  primary_dark_50: '#EAEDF1',
  primary_dark_100: '#DAE0E7',
  primary_dark_200: '#ACBAC8',
  primary_dark_300: '#7B91A7',
  primary_dark_400: '#4B5E71',
  primary_dark_500: '#3B4A59',
  primary_dark_600: '#2F3A46',
  primary_dark_700: '#1F262E',
  primary_dark_800: '#141A1F',
  primary_dark_900: '#101418',
  primary_dark_main: '#7B91A7',
  common_black: '#0B0D0E',

  text_primary: '#1C2025',
  text_secondary: '#434D5B',
  text_tertiary: '#6B7A90',

  grey_50: '#F3F6F9',
  grey_100: '#E5EAF2',
  grey_200: '#DAE2ED',
  grey_300: '#C7D0DD',
  grey_400: '#B0B8C4',
  grey_500: '#9DA8B7',
  grey_600: '#6B7A90',
  grey_700: '#434D5B',
  grey_800: '#303740',
  grey_900: '#1C2025',
  grey_main: '#E5EAF2',
  grey_contrastText: '#6B7A90',
  grey_A100: '#f5f5f5',
  grey_A200: '#eeeeee',
  grey_A400: '#bdbdbd',
  grey_A700: '#616161',

  error_50: '#FFF0F1',
  error_100: '#FFDBDE',
  error_200: '#FFBDC2',
  error_300: '#FF99A2',
  error_400: '#FF7A86',
  error_500: '#FF505F',
  error_600: '#EB0014',
  error_700: '#C70011',
  error_800: '#94000D',
  error_900: '#570007',
  error_main: '#EB0014',
  error_light: '#FF99A2',
  error_dark: '#C70011',

  success_50: '#E9FBF0',
  success_100: '#C6F6D9',
  success_200: '#9AEFBC',
  success_300: '#6AE79C',
  success_400: '#3EE07F',
  success_500: '#21CC66',
  success_600: '#1DB45A',
  success_700: '#1AA251',
  success_800: '#178D46',
  success_900: '#0F5C2E',
  success_main: '#1AA251',
  success_light: '#6AE79C',
  success_dark: '#1AA251',

  warning_50: '#FFF9EB',
  warning_100: '#FFF3C1',
  warning_200: '#FFECA1',
  warning_300: '#FFDC48',
  warning_400: '#F4C000',
  warning_500: '#DEA500',
  warning_600: '#D18E00',
  warning_700: '#AB6800',
  warning_800: '#8C5800',
  warning_900: '#5A3600',
  warning_main: '#DEA500',
  warning_light: '#FFDC48',
  warning_dark: '#AB6800',
  info_main: '#0288d1',
  info_light: '#03a9f4',
  info_dark: '#01579b',

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

type MainColors = {
  primary: string;
  secondary: string;
};

type Colors = MainColors & {
  palette: typeof colors;
  body: MainColors;
};

type FontSizes = {
  [key in 'small' | 'medium' | 'large']: string;
};

type Fonts = {
  names: string[];
  sizes: FontSizes;
};

type Theme = {
  colors: Colors;
  fonts: Fonts;
};

export type GlobalTheme<T = Record<string, unknown>> = T & {
  theme?: Theme;
};

export const theme: Theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.caribbean_green,
    palette: colors,
    body: {
      primary: colors.primary_50,
      secondary: colors.white,
    },
  },
  fonts: {
    names: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'],
    sizes: {
      small: '1em',
      medium: '2em',
      large: '3em',
    },
  },
};
