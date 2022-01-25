import * as React from 'react';
import fetch from 'unfetch';
import ms from 'ms';
import { isMobile } from './is-mobile';
import { useUpdatePoller } from './use-update-poller';
import UpdateAlert from './update-alert';

function AlertOnUpdate() {
  const [userHasDismissed, setUserHasDismissed] = React.useState(false);
  const [updateAvailable] = useUpdatePoller(
    React.useCallback(
      // @ts-ignore as __COMMIT__ will be statically replaced by Vite
      () => checkForUpdate(__COMMIT__),
      [],
    ),
    isMobile() ? ms('1 day') : ms('1 hour'),
  );

  if (updateAvailable && !userHasDismissed) {
    return (
      <div className="flex justify-center border-b border-dark bg-dark text-light shadow-light transition-colors duration-300 focus-within:bg-light focus-within:text-dark hover:bg-light hover:text-dark dark:border-light dark:shadow-dark">
        <UpdateAlert
          siteTitle="Password Lense"
          onReload={() => {
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}
          onDismiss={() => {
            setUserHasDismissed(true);
          }}
        />
      </div>
    );
  }

  return null;
}

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
        const remoteCommit =
          remoteDocument.documentElement.getAttribute('data-commit');
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

export default AlertOnUpdate;
