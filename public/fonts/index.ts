import { sizing } from '../utils/sizing';

interface Fonts {
  regularText: typeof regularText;
  mediumText: typeof mediumText;
  boldText: typeof boldText;
  linkText: typeof linkText;
  fontFamilies: typeof fontFamilies;
}

const FONT_FAMILIES = {
  GEIST: '"Geist", sans-serif',
};

const fontFamilies = {
  geist: {
    'font-family': FONT_FAMILIES.GEIST,
  },
};

const regularText = {
  100: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(13),
    'font-weight': '400',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(14),
    'font-weight': '400',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(16),
    'font-weight': '400',
    'line-height': sizing(20),
    'letter-spacing': sizing(-0.1),
  },
  400: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(17),
    'font-weight': '400',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(18),
    'font-weight': '400',
    'letter-spacing': sizing(-0.15),
    'line-height': sizing(23),
  },
};

const mediumText = {
  100: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(12),
    'font-weight': '500',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(14),
    'font-weight': '500',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(16),
    'font-weight': '500',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(20),
  },
  400: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(17),
    'font-weight': '500',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(18),
    'font-weight': '500',
    'letter-spacing': sizing(-0.15),
    'line-height': sizing(23),
  },
};

const boldText = {
  100: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(12),
    'font-weight': '700',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(14),
    'font-weight': '700',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(16),
    'font-weight': '700',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(20),
  },
  400: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(17),
    'font-weight': '700',
    'letter-spacing': sizing(-0.1),
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(18),
    'font-weight': '700',
    'letter-spacing': sizing(-0.15),
    'line-height': sizing(23),
  },
  600: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(20),
    'font-weight': '700',
    'letter-spacing': sizing(-0.2),
    'line-height': sizing(25),
  },
  700: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(24),
    'font-weight': '700',
    'letter-spacing': sizing(-0.2),
    'line-height': sizing(29),
  },
  800: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(28),
    'font-weight': '700',
    'letter-spacing': sizing(-0.2),
    'line-height': sizing(32),
  },
  900: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(30),
    'font-weight': '700',
    'letter-spacing': sizing(-0.2),
    'line-height': sizing(34),
  },
  1000: {
    'font-family': FONT_FAMILIES.GEIST,
    'font-size': sizing(36),
    'font-weight': '800',
    'letter-spacing': sizing(-0.2),
    'line-height': sizing(46),
  },
};

const linkText = {
  'font-weight': '700',
  'text-decoration': 'none',
  color: 'inherit',
};

export const fonts: Fonts = {
  regularText,
  mediumText,
  boldText,
  linkText,
  fontFamilies,
};
