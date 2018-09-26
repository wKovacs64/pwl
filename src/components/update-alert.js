import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { css } from 'react-emotion';
import axios from 'axios';
import ms from 'ms';
import mq from '../utils/mq';
import isMobile from '../utils/is-mobile';
import AutoUpdater from './auto-updater';

const UpdateAlert = () => (
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
      <AutoUpdater
        hasUpdate={async () => {
          if (typeof window !== 'undefined') {
            try {
              const res = await axios.get('/index.html?no-cache=1', {
                headers: { Pragma: 'no-cache' },
              });

              if (res.data) {
                const remoteDocument = new DOMParser().parseFromString(
                  res.data,
                  'text/html',
                );
                const remoteCommit = remoteDocument.documentElement.getAttribute(
                  'data-commit',
                );
                return (
                  remoteCommit && remoteCommit !== siteMetadata.buildInfo.commit
                );
              }
              return false;
            } catch (err) {
              // no-op: we don't really care if the update checks fail
              return false;
            }
          }
          return false;
        }}
        pollingIntervalMs={
          typeof window !== 'undefined' && isMobile(window.navigator.userAgent)
            ? ms('1 day')
            : ms('1 hour')
        }
      >
        {({ updateAvailable }) =>
          updateAvailable ? (
            <div
              aria-live="polite"
              role="alert"
              className={css`
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                z-index: 9999;
                border-color: #1c304a;
                border-style: solid;
                border-width: 0;
                box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
                ${mq.md(css`
                  top: 1rem;
                  left: unset;
                  right: 1rem;
                  width: auto;
                  border-width: thin;
                `)};
              `}
            >
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.location.reload(true);
                  }
                }}
                className={css`
                  color: #b3efff;
                  background-color: #1c304a;
                  border: none;
                  padding: 1rem;
                  width: 100%;
                  transition: color 0.3s ease, background-color 0.3s ease;
                  & :hover {
                    cursor: pointer;
                    color: #1c304a;
                    background-color: #b3efff;
                  }
                `}
              >
                A new version of {siteMetadata.title} is available!
              </button>
            </div>
          ) : null
        }
      </AutoUpdater>
    )}
  </StaticQuery>
);

export default UpdateAlert;
