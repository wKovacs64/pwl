import React from 'react';
// import { Link } from 'gatsby';
import { css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import mq from '../utils/mq';
import Layout from '../components/layout';
import LenseInput from '../components/lense-input';

const IndexPage = () => (
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
        <h1
          className={css`
            color: #1c304a;
            font-size: 2.25rem;
            margin: 0;
            ${mq.md(css`
              font-size: 3rem;
              margin-top: 4rem;
            `)};
            ${mq.lg(css`
              font-size: 5rem;
              margin-top: 8rem;
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
          Is that an &apos;O&apos; or a &apos;0&apos;? An &apos;I&apos; or an
          &apos;l&apos; - or maybe a &apos;1&apos;? Sometimes, it&apos;s hard to
          tell. Paste your password in the box below for a secure, color-coded
          revelation.
        </p>
        <LenseInput
          className={css`
            margin-top: 2rem;
            margin-bottom: 4rem;
            ${mq.md(css`
              margin-top: 4rem;
              margin-bottom: 8rem;
            `)};
          `}
        />
      </Layout>
    )}
  </StaticQuery>
);

export default IndexPage;
