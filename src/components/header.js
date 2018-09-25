import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css } from 'react-emotion';
import ms from 'ms';
import mq from '../utils/mq';
import isMobile from '../utils/is-mobile';
import AutoUpdater from './auto-updater';

const Header = ({ className }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            buildInfo {
              commit
            }
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
        <AutoUpdater
          siteTitle={siteMetadata.title}
          indexUrl="/index.html?no-cache=1"
          isNewer={remoteDocument => {
            const remoteCommit = remoteDocument.documentElement.getAttribute(
              'data-commit',
            );
            return (
              remoteCommit && remoteCommit !== siteMetadata.buildInfo.commit
            );
          }}
          pollingIntervalMs={
            typeof window !== 'undefined' &&
            isMobile(window.navigator.userAgent)
              ? ms('1 day')
              : ms('1 hour')
          }
        />
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
