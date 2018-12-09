import React, { useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import debounce from 'lodash/debounce';
import colors from '../legend/colors';
import labels from '../legend/labels';
import mq from '../utils/mq';
import Layout from '../components/layout';
import PasswordInput from '../components/password-input';
import Results from '../components/results';

const P = styled('p')`
  color: #046b99;
  max-width: 45ch;
  font-weight: 300;
  font-size: 1.25rem;
  margin: 0 0 2rem;
  ${mq.md} {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 4rem;
  }
  ${mq.lg} {
    font-size: 2.25rem;
  }
`;

function IndexPage() {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordToCheck, setPasswordToCheck] = useState('');
  const setPasswordToCheckDebounced = useCallback(
    debounce(setPasswordToCheck, 250, { leading: true }),
    [],
  );

  function handleEscape() {
    setPasswordInput('');
    setPasswordToCheck('');
  }

  function handleInputKeyDown({ keyCode }) {
    if (keyCode === 27 /* ESC */) {
      handleEscape();
    }
  }

  function handlePasswordChange({ target: { value } }) {
    setPasswordInput(value);
    setPasswordToCheck('');
    setPasswordToCheckDebounced(value);
  }

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
            <style>{'.js { display: none; }'}</style>
            <article
              css={css`
                display: flex;
                flex-direction: column;
                ${mq.md} {
                  align-items: center;
                }
              `}
            >
              <P>This application requires JavaScript.</P>
              <P
                css={css`
                  max-width: 35ch;
                `}
              >
                You&apos;re either using an incompatible browser or JavaScript
                is disabled.
              </P>
            </article>
          </noscript>
          <article
            className="js"
            css={css`
              display: flex;
              flex-direction: column;
              ${mq.md} {
                align-items: center;
              }
            `}
          >
            <P>
              Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or
              an &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes, it&apos;s
              hard to tell. Paste your password in the box below for a{' '}
              <span
                title="Your password never leaves your browser!"
                css={css`
                  border-bottom: 2px dashed #b3efff;
                `}
              >
                secure
              </span>
              , color-coded revelation.
            </P>
            <section
              css={css`
                width: 100%;
                max-width: 32rem;
              `}
            >
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
            </section>
          </article>
        </Layout>
      )}
    </StaticQuery>
  );
}

export default IndexPage;
