import React, { Component } from 'react';
// import { Link } from 'gatsby';
import { css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import mq from '../utils/mq';
import Layout from '../components/layout';
import LenseInput from '../components/lense-input';
import LenseOutput from '../components/lense-output';

class IndexPage extends Component {
  state = {
    password: '',
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
                title
              }
            }
          }
        `}
      >
        {({ site: { siteMetadata } }) => (
          <Layout>
            <article
              className={css`
                display: flex;
                flex-direction: column;
                margin-bottom: 4rem;
                ${mq.md(css`
                  align-items: center;
                  margin-top: 4rem;
                  margin-bottom: 8rem;
                `)};
                ${mq.lg(css`
                  margin-top: 8rem;
                `)};
              `}
            >
              <h1
                className={css`
                  color: #1c304a;
                  font-family: 'Nunito', sans-serif;
                  font-size: 2.25rem;
                  font-variant: small-caps;
                  margin: 0;
                  ${mq.md(css`
                    font-size: 3rem;
                  `)};
                  ${mq.lg(css`
                    font-size: 5rem;
                  `)};
                `}
              >
                {siteMetadata.title}
              </h1>
              <p
                className={css`
                  color: #046b99;
                  max-width: 45ch;
                  font-weight: 300;
                  font-size: 1.25rem;
                  margin: 2rem 0;
                  ${mq.md(css`
                    text-align: center;
                    font-size: 1.5rem;
                    margin: 4rem 0;
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
                  title="Your password is never transmitted!"
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
                <LenseInput
                  password={password}
                  onChange={this.handlePasswordChange}
                />
                {password && (
                  <LenseOutput
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
