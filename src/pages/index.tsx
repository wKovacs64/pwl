import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import debounce from 'lodash/debounce';
import colors from '../legend/colors';
import labels from '../legend/labels';
import mq from '../utils/mq';
import NoScriptMessage from '../components/noscript-message';
import Layout from '../components/layout';
import PasswordInput from '../components/password-input';
import Results from '../components/results';
import { light, dark } from '../theme';

const Content = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  font-weight: 300;
  font-size: 1.25rem;
  margin: 0 0 2rem;
  max-width: 26rem;
  ${mq.md} {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 4rem;
    max-width: 32rem;
  }
  ${mq.lg} {
    font-size: 2.25rem;
    max-width: 48rem;
  }
  body.light-mode & {
    color: ${light.colors.brandedText};
  }
  body.dark-mode & {
    color: ${dark.colors.brandedText};
  }
`;

const Hint = styled.span`
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  body.light-mode & {
    border-bottom-color: ${light.colors.pageUnderline};
  }
  body.dark-mode & {
    border-bottom-color: ${dark.colors.pageUnderline};
  }
`;

const InputAndResults = styled.section`
  width: 100%;
  max-width: 32rem;
`;

const IndexPage: React.FunctionComponent = () => {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordToCheck, setPasswordToCheck] = useState('');
  const setPasswordToCheckDebounced = useCallback(
    debounce(setPasswordToCheck, 250, { leading: true }),
    [],
  );

  const handleEscape = () => {
    setPasswordInput('');
    setPasswordToCheck('');
  };

  const handleInputKeyDown: React.KeyboardEventHandler = ({ keyCode }) => {
    if (keyCode === 27 /* ESC */) {
      handleEscape();
    }
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setPasswordInput(value);
    setPasswordToCheckDebounced(value);
  };

  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              description
            }
          }
        }
      `}
    >
      {({ site: { siteMetadata } }) => (
        <Layout>
          <Helmet
            meta={[{ name: 'description', content: siteMetadata.description }]}
          />
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="Escape"
            onKeyHandle={handleEscape}
          />
          <noscript>
            <style>{'.js { display: none !important; }'}</style>
            <NoScriptMessage />
          </noscript>
          <Content className="js">
            <P>
              Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or
              an &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes, it&apos;s
              hard to tell. Paste your password in the box below for a{' '}
              <Hint title="Your password never leaves your browser!">
                secure
              </Hint>
              , color-coded revelation.
            </P>
            <InputAndResults>
              <PasswordInput
                password={passwordInput}
                onChange={handlePasswordChange}
                onKeyDown={handleInputKeyDown}
              />
              {passwordInput && (
                <Results
                  colors={colors}
                  labels={labels}
                  passwordInput={passwordInput}
                  passwordToCheck={passwordToCheck}
                  css={css`
                    margin-top: 2rem;
                  `}
                />
              )}
            </InputAndResults>
          </Content>
        </Layout>
      )}
    </StaticQuery>
  );
};

export default IndexPage;
