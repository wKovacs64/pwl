/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

// Hack: appease the Lighthouse PWA audit, even though a real noscript tag
// exists in the Layout component.
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <noscript key="lighthouse-noscript" hidden>
      Please enable JavaScript.
    </noscript>,
  ]);
};
