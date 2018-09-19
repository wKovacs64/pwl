import 'normalize.css';
import 'typeface-source-sans-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import Main from './main';
import Footer from './footer';

injectGlobal`
  @font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro');
  }
  body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto,
      'segoe ui', arial, sans-serif;
  }
  html,
  body,
  div,
  article,
  aside,
  section,
  main,
  nav,
  footer,
  header,
  form,
  fieldset,
  legend,
  pre,
  code,
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figcaption,
  figure,
  textarea,
  table,
  td,
  th,
  tr,
  input[type='email'],
  input[type='number'],
  input[type='password'],
  input[type='tel'],
  input[type='text'],
  input[type='url'] {
    box-sizing: border-box;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            buildInfo {
              commit
              version
            }
          }
        }
      }
    `}
  >
    {({ site: { siteMetadata } }) => (
      <>
        <Helmet title={siteMetadata.title}>
          <html
            lang="en"
            data-commit={siteMetadata.buildInfo.commit}
            data-version={siteMetadata.buildInfo.version}
          />
        </Helmet>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding: 0 1rem;
          `}
        >
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </>
    )}
  </StaticQuery>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
