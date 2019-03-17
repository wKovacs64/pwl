import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import React from 'react';
import { Helmet } from 'react-helmet';
import { css, Global, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { IconContext } from 'react-icons';
import { useStaticQuery, graphql } from 'gatsby';
import useDarkMode from 'use-dark-mode';
import Header from './header';
import Main from './main';
import Footer from './footer';

const FullHeightContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 2rem;
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          socialImageUrl
          buildInfo {
            commit
          }
        }
      }
    }
  `);
  const darkMode = useDarkMode(false);

  return (
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
                  helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
              }
              #gatsby-noscript {
                display: none;
              }
            `}
          />
          <Helmet
            htmlAttributes={{
              lang: 'en',
              'data-commit': siteMetadata.buildInfo.commit,
            }}
            title={siteMetadata.title}
            meta={[
              { name: 'description', content: siteMetadata.description },
              { property: 'og:type', content: 'website' },
              { property: 'og:title', content: siteMetadata.title },
              {
                property: 'og:description',
                content: siteMetadata.description,
              },
              {
                property: 'og:image',
                content: siteMetadata.socialImageUrl,
              },
              { property: 'og:image:alt', content: siteMetadata.title },
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:title', content: siteMetadata.title },
              {
                name: 'twitter:description',
                content: siteMetadata.description,
              },
              {
                name: 'twitter:image',
                content: siteMetadata.socialImageUrl,
              },
              { name: 'twitter:image:alt', content: siteMetadata.title },
            ]}
          />
          <FullHeightContainer>
            <Header onThemeToggle={darkMode.toggle} />
            <Main>{children}</Main>
            <Footer />
          </FullHeightContainer>
        </IconContext.Provider>
      )}
    </ClassNames>
  );
};

export default Layout;
