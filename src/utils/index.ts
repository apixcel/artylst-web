export const PIXEL_TO_REM_RATIO = 10;

export const pixelToRem = (pixel: number, unit = PIXEL_TO_REM_RATIO): string => {
  return `${pixel / unit}rem`;
};

export const aspectRatios = {
  SIXTEEN_BY_NINE: 9 / 16,
};
