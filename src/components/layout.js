import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { IconContext } from 'react-icons';
import { StaticQuery, graphql } from 'gatsby';
import mq from '../utils/mq';
import Header from './header';
import Main from './main';
import Footer from './footer';

injectGlobal`
  @font-face {
    font-family: 'Nunito';
    src: local('Nunito');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro');
  }
  body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto,
      'segoe ui', arial, sans-serif;
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
      <IconContext.Provider
        value={{
          className: css`
            vertical-align: middle;
          `,
        }}
      >
        <Helmet title={siteMetadata.title}>
          <html
            lang="en"
            data-commit={siteMetadata.buildInfo.commit}
            data-version={siteMetadata.buildInfo.version}
          />
        </Helmet>
        <div
          className={css`
            min-height: 100vh;
            padding: 1rem;
            ${mq.md(css`
              padding: 0 0 1rem;
            `)};
          `}
        >
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </IconContext.Provider>
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
