import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

function AppProviders({ children }: { children: React.ReactNode }) {
  const iconContextValue = React.useMemo(
    () => ({ className: 'align-middle' }),
    [],
  );

  return (
    <BrowserRouter>
      <IconContext.Provider value={iconContextValue}>
        {children}
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default AppProviders;
