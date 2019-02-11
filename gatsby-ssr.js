/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';
import { Style, Script } from './src/components/hydrate-theme';

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  replaceHeadComponents([
    ...getHeadComponents(),
    <Style key="hydrate-theme-style" />,
  ]);
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<Script key="hydrate-theme-script" />]);
};
