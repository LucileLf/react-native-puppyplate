// primary tint colors for light and dark themes respectively.
// const tintColorLight = '#2f95dc';
const tintColorLight = '#78a112';
const tintColorDark = '#fff';
export const green = '#36af13';
// additional color constants, not directly used in the theme objects but available for use elsewhere in the application:
export const purple = "#871763";

export const beige = "#ebe4cd";
export const darkbeige = "#e8d0ac";
export const black = "#062f2c";
export const orange = "#c17229";
export const lightgreen = "#7fa343";
export const darkgray = "#647d77";
export const lightgray= "#88a19f";
export const indent= "#BEB19F";


export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: tintColorDark,
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  // palette: {
  //   beige: "#ebe4cd",
  //   darkbeige: "#e8d0ac",
  //   black: "#062f2c",
  //   orange: "#c17229",
  //   lightgreen: "#7fa343",
  //   midgreen: "#5c8830",
  //   darkgreen1: "#3a7226",
  //   darkgreen2: "#3a7226",
  //   darkgray: "#647d77",
  //   lightgray: "#88a19f",
  // }
};
