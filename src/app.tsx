import '@fontsource/nunito/latin-700.css';
import '@fontsource/source-sans-pro/latin-300.css';
import '@fontsource/source-sans-pro/latin-400.css';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import HomePage from './home-page';
import NotFoundPage from './not-found-page';
import './app.css';

function App() {
  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ 'data-commit': __COMMIT__ }} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
