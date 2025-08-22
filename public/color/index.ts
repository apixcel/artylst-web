export type color = keyof typeof solids;
export type grays = keyof typeof grays;
export type blacks = keyof typeof blacks;
export type charity = keyof typeof charities;
export type background = keyof typeof background;

interface Colors {
  solids: { [K in color]: string };
  grays: { [K in grays]: string };
  blacks: { [K in blacks]: string };
  charities: { [K in charity]: string };
  background: { [K in background]: string };
}

const solids = {
  PRIMARY: '#A434E5', // hover: #EB3D88
  SECONDARY: '#BD00FF',
  NEON_BLUE: '#45FFFF',
  MARIO_COIN: '#FFD643',
  DARK: '#000000',
  WHITE: '#FFFFFF',
  MUTED: '#ADAEB5',
  ERROR: '#FF0761',
  DARK_BLUE: '#131631',
  BLACK: '#000000',
  GREENIEST: '#4ADB84',
  FOG: '#DADBE7',
  LIGHT: '#F3F4FE',
  SUPER_LIGHT: '#FCFCFF',
  GOLD: '#FFC640',
};

const charities = {
  DEMOCRATS_BLUE: '#22418e',
  REPUBLICAN_RED: '#EB3A42',
  RED_CAMPAIGN_RED: '#AF1E2D',
};

const grays = {
  GRAY20: '#F3F4FE',
  GRAY40: '#707070',
  GRAY50: '#3E3E3E',
  GRAY60: '#252525',
  GRAY60TRANSPARENT: '#25252566',
  GRAY70: '#1C1C1C',
  GRAY90: '#101010',
};

const blacks = {
  BLACKTRANSPARENT40: '#00000066',
  BLACKTRANSPARENT70: '#000000B2',
};

const background = {
  LEVEL0: '#141114',
  LEVEL1: '#1E1B1E',
  LEVEL2: '#2B262B',
  LEVEL2TRANSPARENT40: '#2B262B66',
};

export const colors: Colors = { solids, grays, blacks, charities, background };
