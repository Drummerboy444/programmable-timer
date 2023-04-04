type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type Hex = `#${string}`;

export type Color = RGB | RGBA | Hex;

export type Theme = {
  primaryColor: Color;
  secondaryColor: Color;
  backgroundColor: Color;
  textColor: Color;
  shadowColor: Color;
  shadowOpacity: number;
};

export const themeTypes = ['light', 'dark'] as const;

export type ThemeType = (typeof themeTypes)[number];

export const isThemeType = (
  maybeThemeType: unknown,
): maybeThemeType is ThemeType =>
  themeTypes.includes(maybeThemeType as ThemeType);
