import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
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

class IndexPage extends Component {
  state = {
    password: '',
  };

  handleEscape = () => {
    this.setState({ password: '' });
  };

  handleInputKeyDown = ({ keyCode }) => {
    if (keyCode === 27 /* ESC */) {
      this.handleEscape();
    }
  };

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  render() {
    const { password } = this.state;

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
              meta={[
                { name: 'description', content: siteMetadata.description },
              ]}
            />
            <KeyHandler
              keyEventName={KEYDOWN}
              keyValue="Escape"
              onKeyHandle={this.handleEscape}
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
                an &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes,
                it&apos;s hard to tell. Paste your password in the box below for
                a{' '}
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
                  password={password}
                  onChange={this.handlePasswordChange}
                  onKeyDown={this.handleInputKeyDown}
                />
                {password && (
                  <Results
                    colors={colors}
                    labels={labels}
                    password={password}
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
}

export default IndexPage;
