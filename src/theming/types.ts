type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type Hex = `#${string}`;

export type Color = RGB | RGBA | Hex;

export type Theme = {
  primaryColor: Color;
  backgroundColor: Color;
  textColor: Color;
  shadowColor: Color;
  shadowOpacity: number;
};

export type ThemeType = 'light' | 'dark';
