import '@wkovacs64/normalize.css';
import 'typeface-nunito';
import 'typeface-source-sans-pro';
import * as React from 'react';
import { css, Global, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { IconContext } from 'react-icons';
import useDarkMode from 'use-dark-mode';
import Header from './header';
import Main from './main';
import Footer from './footer';

const FullHeightContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 2rem;
`;

const Layout: React.FunctionComponent = ({ children }) => {
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
