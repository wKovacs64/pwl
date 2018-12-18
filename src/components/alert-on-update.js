import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import axios from 'axios';
import ms from 'ms';
import mq from '../utils/mq';
import isMobile from '../utils/is-mobile';
import UpdatePoller from './update-poller';
import UpdateAlert from './update-alert';

const UpdateAlertContainer = styled.div`
  display: flex;
  justify-content: stretch;
  border-color: #1c304a;
  border-style: solid;
  border-width: 0;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
  color: #b3efff;
  background-color: #1c304a;
  transition: color 0.3s ease, background-color 0.3s ease;
  &:hover,
  &:focus-within {
    color: #1c304a;
    background-color: #b3efff;
  }
  ${mq.md} {
    justify-content: center;
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
