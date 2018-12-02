import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import mq from '../utils/mq';
import UpdateAlert from './update-alert';

const Header = props => (
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
      <header {...props}>
        <UpdateAlert />
        <section
          css={css`
            display: flex;
            ${mq.md(css`
              justify-content: center;
            `)};
          `}
        >
          <h1
            css={css`
              color: #1c304a;
              font-family: 'Nunito', sans-serif;
              font-size: 2.25rem;
              font-variant: small-caps;
              text-shadow: 1px 1px 1px #046b99;
              margin: 0;
              ${mq.md(css`
                font-size: 3rem;
                margin-top: 4rem;
              `)};
              ${mq.lg(css`
                font-size: 5rem;
              `)};
            `}
          >
            {siteMetadata.title}
          </h1>
        </section>
      </header>
    )}
  </StaticQuery>
);

export default Header;
