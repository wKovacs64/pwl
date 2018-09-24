import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import colors from '../legend/colors';
import labels from '../legend/labels';
import mq from '../utils/mq';
import Layout from '../components/layout';
import PasswordInput from '../components/password-input';
import Results from '../components/results';

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
            <article
              className={css`
                display: flex;
                flex-direction: column;
                ${mq.md(css`
                  align-items: center;
                `)};
              `}
            >
              <p
                className={css`
                  color: #046b99;
                  max-width: 45ch;
                  font-weight: 300;
                  font-size: 1.25rem;
                  margin: 0 0 2rem;
                  ${mq.md(css`
                    text-align: center;
                    font-size: 1.5rem;
                    margin-bottom: 4rem;
                  `)};
                  ${mq.lg(css`
                    font-size: 2.25rem;
                  `)};
                `}
              >
                Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or
                an &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes,
                it&apos;s hard to tell. Paste your password in the box below for
                a{' '}
                <span
                  title="Your password never leaves your browser!"
                  className={css`
                    border-bottom: 2px dashed #b3efff;
                  `}
                >
                  secure
                </span>
                , color-coded revelation.
              </p>
              <section
                className={css`
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
                    className={css`
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
