import * as React from 'react';
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

function ThemeHydrationStyleTag(): JSX.Element {
  return (
    // eslint-disable-next-line react/no-danger
    <style dangerouslySetInnerHTML={{ __html: hydrateThemeCss }} />
  );
}

export default ThemeHydrationStyleTag;
