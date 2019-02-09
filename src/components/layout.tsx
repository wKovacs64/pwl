import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import React from 'react';
import { Helmet } from 'react-helmet';
import { css, Global, ClassNames } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { IconContext } from 'react-icons';
import { StaticQuery, graphql } from 'gatsby';
import useDarkMode from 'use-dark-mode';
import styled from '../utils/styled';
import { light, dark } from '../theme';
import Header from './header';
import Main from './main';
import Footer from './footer';

const FullHeightThemedContainer = styled.div`
  color: ${({ theme }) => theme.colors.pageText};
  background-color: ${({ theme }) => theme.colors.pageBackground};
  min-height: 100vh;
  padding-bottom: 2rem;
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const darkMode = useDarkMode(false);

  return (
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
                      BlinkMacSystemFont, 'avenir next', avenir,
                      'helvetica neue', helvetica, ubuntu, roboto, noto,
                      'segoe ui', arial, sans-serif;
                  }
                  #gatsby-noscript {
                    display: none;
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
              >
                <html
                  lang="en"
                  data-commit={siteMetadata.buildInfo.commit}
                  data-version={siteMetadata.buildInfo.version}
                />
              </Helmet>
              <ThemeProvider theme={darkMode.value ? dark : light}>
                <FullHeightThemedContainer>
                  <Header onThemeToggle={darkMode.toggle} />
                  <Main>{children}</Main>
                  <Footer />
                </FullHeightThemedContainer>
              </ThemeProvider>
            </IconContext.Provider>
          )}
        </ClassNames>
      )}
    </StaticQuery>
  );
};

export default Layout;
