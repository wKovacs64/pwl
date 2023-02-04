import * as React from 'react';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/source-sans-pro/latin-300.css';
import '@fontsource/source-sans-pro/latin-400.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import HomePage from './home-page';
import NotFoundPage from './not-found-page';
import './app.css';

function App() {
  React.useEffect(() => {
    document.documentElement.dataset.commit = __COMMIT__;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
