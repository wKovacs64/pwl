import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Header = ({ className }) => (
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
      <header
        className={css`
          ${className};
        `}
      >
        <section
          className={css`
            display: flex;
            ${mq.md(css`
              justify-content: center;
            `)};
          `}
        >
          <h1
            className={css`
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
                margin-top: 8rem;
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

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
