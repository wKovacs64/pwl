import * as React from 'react';
import { useMachine } from '@xstate/react';
import {
  updatePollerModel,
  updatePollerMachine,
} from './update-poller.machine';

function clearIntervalSafely(interval: Interval) {
  if (typeof window !== 'undefined' && interval) {
    window.clearInterval(interval);
  }
}

export function useUpdatePoller(
  hasUpdate: () => Promise<boolean>,
  pollingIntervalMs: number,
  { checkImmediately }: UpdatePollerOptions | undefined = {
    checkImmediately: false,
  },
): readonly [boolean, string] {
  const intervalRef = React.useRef<Interval>(null);
  const [current, send] = useMachine(updatePollerMachine);
  const { updateAvailable, error } = current.context;

  const checkForUpdate = React.useCallback(() => {
    send(updatePollerModel.events.checkForUpdate(hasUpdate));
  }, [hasUpdate, send]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (checkImmediately) {
        checkForUpdate();
      }
      intervalRef.current = window.setInterval(
        checkForUpdate,
        pollingIntervalMs,
      );
    }
    return () => clearIntervalSafely(intervalRef.current);
  }, [checkForUpdate, pollingIntervalMs, checkImmediately]);

  return [updateAvailable, error];
}

type Interval = number | null;

interface UpdatePollerOptions {
  // whether or not to poll immediately (in addition to the interval)
  checkImmediately: boolean;
}
