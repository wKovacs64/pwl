import React from 'react';
import { light, dark } from '../theme';

const hydrateThemeCss = `
  body.light-mode {
    color: ${light.colors.pageText};
    background-color: ${light.colors.pageBackground};
  }
  body.dark-mode {
    color: ${dark.colors.pageText};
    background-color: ${dark.colors.pageBackground};
  }
`.replace(/\s+/g, '');

const ThemeHydrationStyleTag: React.FunctionComponent = () => (
  // eslint-disable-next-line react/no-danger
  <style dangerouslySetInnerHTML={{ __html: hydrateThemeCss }} />
);

export default ThemeHydrationStyleTag;
