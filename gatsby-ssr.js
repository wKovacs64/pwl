/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';
import ThemeHydrationStyleTag from './src/components/theme-hydration-style-tag';

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  replaceHeadComponents([
    ...getHeadComponents(),
    <ThemeHydrationStyleTag key="theme-hydration-style-tag" />,
  ]);
};
