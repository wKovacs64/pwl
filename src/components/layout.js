import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css, Global } from '@emotion/core';
import { IconContext } from 'react-icons';
import { StaticQuery, graphql } from 'gatsby';
import mq from '../utils/mq';
import Header from './header';
import Main from './main';
import Footer from './footer';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            socialImageUrl
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
        <Global
          styles={css`
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
                'avenir next', avenir, 'helvetica neue', helvetica, ubuntu,
                roboto, noto, 'segoe ui', arial, sans-serif;
            }
          `}
        />
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: siteMetadata.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: siteMetadata.title },
            { property: 'og:description', content: siteMetadata.description },
            { property: 'og:image', content: siteMetadata.socialImageUrl },
            { property: 'og:image:alt', content: siteMetadata.title },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: siteMetadata.title },
            { name: 'twitter:description', content: siteMetadata.description },
            { name: 'twitter:image', content: siteMetadata.socialImageUrl },
            { name: 'twitter:image:alt', content: siteMetadata.title },
          ]}
        >
          <html
            lang="en"
            data-commit={siteMetadata.buildInfo.commit}
            data-version={siteMetadata.buildInfo.version}
          />
        </Helmet>
        <div
          css={css`
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
