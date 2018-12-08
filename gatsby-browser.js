/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { setConfig } from 'react-hot-loader';

// TODO: remove once Gatsby and react-hot-loader support hooks
setConfig({
  pureSFC: true,
  pureRender: true,
});
