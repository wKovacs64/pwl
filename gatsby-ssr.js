/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';
import HydrateTheme from './src/components/hydrate-theme';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<HydrateTheme key="hydrate-theme" />]);
};
