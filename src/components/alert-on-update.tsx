import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import axios from 'axios';
import ms from 'ms';
import isMobile from '../utils/is-mobile';
import UpdatePoller from './update-poller';
import UpdateAlert from './update-alert';

const UpdateAlertContainer = styled.div`
  display: flex;
  justify-content: center;
  border-style: solid;
  border-width: 0 0 1px;
  border-color: ${({ theme }) => theme.colors.alertBorder};
  box-shadow: 4px 4px 8px 0px ${({ theme }) => theme.colors.alertShadow};
  color: ${({ theme }) => theme.colors.alertText};
  background-color: ${({ theme }) => theme.colors.alertBackground};
  transition: color 0.3s ease, background-color 0.3s ease;
  &:hover,
  &:focus-within {
    color: ${({ theme }) => theme.colors.alertBackground};
    background-color: ${({ theme }) => theme.colors.alertText};
  }
`;

function AlertOnUpdate() {
  const [userHasDismissed, setUserHasDismissed] = useState(false);

  async function checkForUpdate(localCommit) {
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
          return remoteCommit && remoteCommit !== localCommit;
        }
        return false;
      } catch (err) {
        // no-op: we don't really care if the update checks fail
        return false;
      }
    }
    return false;
  }

  return (
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
        <UpdatePoller
          hasUpdate={() => checkForUpdate(siteMetadata.buildInfo.commit)}
          pollingIntervalMs={isMobile() ? ms('1 day') : ms('1 hour')}
        >
          {({ updateAvailable }) =>
            updateAvailable && !userHasDismissed ? (
              <UpdateAlertContainer>
                <UpdateAlert
                  siteTitle={siteMetadata.title}
                  onReload={() => {
                    if (typeof window !== 'undefined') {
                      window.location.reload(true);
                    }
                  }}
                  onDismiss={() => {
                    setUserHasDismissed(true);
                  }}
                />
              </UpdateAlertContainer>
            ) : null
          }
        </UpdatePoller>
      )}
    </StaticQuery>
  );
}

export default AlertOnUpdate;
