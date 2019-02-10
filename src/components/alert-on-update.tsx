import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import axios from 'axios';
import ms from 'ms';
import styled from '@emotion/styled';
import isMobile from '../utils/is-mobile';
import { light, dark } from '../theme';
import UpdatePoller from './update-poller';
import UpdateAlert from './update-alert';

const UpdateAlertContainer = styled.div`
  display: flex;
  justify-content: center;
  border-style: solid;
  border-width: 0 0 1px;
  transition: color 0.3s ease, background-color 0.3s ease;
  body.light-mode & {
    border-color: ${light.colors.alertBorder};
    box-shadow: 4px 4px 8px 0px ${light.colors.alertShadow};
    color: ${light.colors.alertText};
    background-color: ${light.colors.alertBackground};
    &:hover,
    &:focus-within {
      color: ${light.colors.alertBackground};
      background-color: ${light.colors.alertText};
    }
  }
  body.dark-mode & {
    border-color: ${dark.colors.alertBorder};
    box-shadow: 4px 4px 8px 0px ${dark.colors.alertShadow};
    color: ${dark.colors.alertText};
    background-color: ${dark.colors.alertBackground};
    &:hover,
    &:focus-within {
      color: ${dark.colors.alertBackground};
      background-color: ${dark.colors.alertText};
    }
  }
`;

const AlertOnUpdate: React.FunctionComponent = () => {
  const [userHasDismissed, setUserHasDismissed] = useState(false);

  const checkForUpdate = async (localCommit: string): Promise<boolean> => {
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
          return Boolean(remoteCommit && remoteCommit !== localCommit);
        }
        return false;
      } catch (err) {
        // no-op: we don't really care if the update checks fail
        return false;
      }
    }
    return false;
  };

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
          {({ updateAvailable }: { updateAvailable: boolean }) =>
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
};

export default AlertOnUpdate;
