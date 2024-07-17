import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import AppProviders from './app-providers';
import './pwa';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
