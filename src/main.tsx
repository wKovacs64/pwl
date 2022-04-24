import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import AppProviders from './app-providers';

if (typeof window !== 'undefined') {
  import('./pwa');
}

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
