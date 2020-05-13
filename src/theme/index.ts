interface Palette {
  readonly white: string;
  readonly nearWhite: string;
  readonly light: string;
  readonly bright: string;
  readonly medium: string;
  readonly dark: string;
  readonly nearBlack: string;
}

export const palette: Palette = {
  white: '#ffffff',
  nearWhite: '#f4f4f4',
  light: '#b3efff',
  bright: '#00cfff',
  medium: '#046b99',
  dark: '#1c304a',
  nearBlack: '#111111',
};

interface Theme {
  readonly colors: {
    readonly pageBackground: string;
    readonly pageText: string;
    readonly pageUnderline: string;
    readonly lenseBackground: string;
    readonly lenseBorder: string;
    readonly lenseUnderline: string;
    readonly lenseScrollThumb: string;
    readonly lenseScrollTrack: string;
    readonly inputBackground: string;
    readonly inputBorder: string;
    readonly brandedText: string;
    readonly headline: string;
    readonly headlineShadow: string;
    readonly alertText: string;
    readonly alertBackground: string;
    readonly alertBorder: string;
    readonly alertShadow: string;
    readonly dullText: string;
    readonly cleanExclamation: string;
    readonly pwnedExclamation: string;
  };
}

export const light: Theme = {
  colors: {
    pageBackground: palette.white,
    pageText: palette.nearBlack,
    pageUnderline: palette.bright,
    lenseBackground: palette.dark,
    lenseBorder: palette.white,
    lenseUnderline: palette.nearWhite,
    lenseScrollThumb: '#cdcdcd',
    lenseScrollTrack: '#f0f0f0',
    inputBackground: palette.white,
    inputBorder: 'rgba(0, 0, 0, 0.3)',
    brandedText: palette.medium,
    headline: palette.dark,
    headlineShadow: palette.medium,
    alertText: palette.light,
    alertBackground: palette.dark,
    alertBorder: palette.dark,
    alertShadow: 'rgba(0, 0, 0, 0.2)',
    dullText: '#777777',
    cleanExclamation: '#20603c', // congratulations
    pwnedExclamation: '#e7040f', // uh-oh!
  },
};

export const dark: Theme = {
  colors: {
    pageBackground: palette.dark,
    pageText: palette.nearWhite,
    pageUnderline: palette.light,
    lenseBackground: palette.dark,
    lenseBorder: 'rgba(179, 239, 255, 0.3)',
    lenseUnderline: palette.nearWhite,
    lenseScrollThumb: '#32445c',
    lenseScrollTrack: '#49596e',
    inputBackground: palette.dark,
    inputBorder: 'rgba(179, 239, 255, 0.3)',
    brandedText: palette.bright,
    headline: palette.light,
    headlineShadow: palette.bright,
    alertText: palette.light,
    alertBackground: palette.dark,
    alertBorder: palette.light,
    alertShadow: 'rgba(179, 239, 255, 0.15)',
    dullText: '#929292',
    cleanExclamation: '#01ad47', // congratulations
    pwnedExclamation: '#e7903c', // uh-oh!
  },
};
