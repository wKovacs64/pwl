import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css, Global, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { IconContext } from 'react-icons';
import { StaticQuery, graphql } from 'gatsby';
import mq from '../utils/mq';
import AlertOnUpdate from './alert-on-update';
import Header from './header';
import Main from './main';
import Footer from './footer';

const ContentContainer = styled.div`
  padding: 1rem;
  ${mq.md} {
    padding: 0 0 1rem;
  }
`;

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
      <ClassNames>
        {({ css: classNameFromCss }) => (
          <IconContext.Provider
            value={{
              className: classNameFromCss`
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
                  font-family: 'Source Sans Pro', -apple-system,
                    BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue',
                    helvetica, ubuntu, roboto, noto, 'segoe ui', arial,
                    sans-serif;
                }
              `}
            />
            <Helmet
              title={siteMetadata.title}
              meta={[
                { name: 'description', content: siteMetadata.description },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: siteMetadata.title },
                {
                  property: 'og:description',
                  content: siteMetadata.description,
                },
                { property: 'og:image', content: siteMetadata.socialImageUrl },
                { property: 'og:image:alt', content: siteMetadata.title },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: siteMetadata.title },
                {
                  name: 'twitter:description',
                  content: siteMetadata.description,
                },
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
              `}
            >
              <AlertOnUpdate />
              <ContentContainer>
                <Header />
                <Main>{children}</Main>
                <Footer />
              </ContentContainer>
            </div>
          </IconContext.Provider>
        )}
      </ClassNames>
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
