import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import fetch from 'unfetch';
import ms from 'ms';
import styled from '@emotion/styled';
import { light, dark } from '../theme';
import { isMobile, useUpdatePoller } from '../utils';
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

async function checkForUpdate(localCommit: string) {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/index.html?no-cache=1', {
        method: 'GET',
        headers: { Pragma: 'no-cache' },
      });
      const data = await res.json();

      if (data) {
        const remoteDocument = new DOMParser().parseFromString(
          data,
          'text/html',
        );
        const remoteCommit = remoteDocument.documentElement.getAttribute(
          'data-commit',
        );
        return Boolean(remoteCommit && remoteCommit !== localCommit);
      }
      return false;
    } catch (err: unknown) {
      // no-op: we don't really care if the update checks fail
      return false;
    }
  }
  return false;
}

function AlertOnUpdate(): JSX.Element | null {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
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
  `);
  const [userHasDismissed, setUserHasDismissed] = React.useState(false);
  const [updateAvailable] = useUpdatePoller(
    React.useCallback(() => checkForUpdate(siteMetadata.buildInfo.commit), [
      siteMetadata.buildInfo.commit,
    ]),
    isMobile() ? ms('1 day') : ms('1 hour'),
  );

  if (updateAvailable && !userHasDismissed) {
    return (
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
    );
  }

  return null;
}

export default AlertOnUpdate;
