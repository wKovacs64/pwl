import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import axios from 'axios';
import ms from 'ms';
import isMobile from '../utils/is-mobile';
import UpdatePoller from './update-poller';
import UpdateAlert from './update-alert';

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
            ) : null
          }
        </UpdatePoller>
      )}
    </StaticQuery>
  );
}

export default AlertOnUpdate;
