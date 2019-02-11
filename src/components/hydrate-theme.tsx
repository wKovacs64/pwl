/* eslint-disable react/no-danger */
import React from 'react';
import Terser from 'terser';
import { light, dark } from '../theme';

// https://raw.githubusercontent.com/donavon/use-dark-mode/develop/noflash.js.txt
const hydrateThemeScript =
  Terser.minify(`
  (function() {
    // Change these if you use something different in your hook.
    var storageKey = 'darkMode';
    var classNameDark = 'dark-mode';
    var classNameLight = 'light-mode';

    function setClassOnDocumentBody(darkMode) {
      document.body.classList.add(darkMode ? classNameDark : classNameLight);
      document.body.classList.remove(darkMode ? classNameLight : classNameDark);
    }

    var preferDarkQuery = '(prefers-color-scheme: dark)';
    var mql = window.matchMedia(preferDarkQuery);
    var supportsColorSchemeQuery = mql.media === preferDarkQuery;
    var localStorageTheme = null;
    try {
      localStorageTheme = localStorage.getItem(storageKey);
    } catch (err) {}
    var localStorageExists = localStorageTheme !== null;
    if (localStorageExists) {
      localStorageTheme = JSON.parse(localStorageTheme);
    }

    // Determine the source of truth
    if (localStorageExists) {
      // source of truth from localStorage
      setClassOnDocumentBody(localStorageTheme);
    } else if (supportsColorSchemeQuery) {
      // source of truth from system
      setClassOnDocumentBody(mql.matches);
      localStorage.setItem(storageKey, mql.matches);
    } else {
      // source of truth from document.body
      var isDarkMode = document.body.classList.contains(classNameDark);
      localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
    }
  })();
`).code || '';

const hydrateThemeCss = `
  body.light-mode { background-color: ${light.colors.pageBackground}; }
  body.dark-mode { background-color: ${dark.colors.pageBackground}; }
`.replace(/\s+/g, '');

export const Style: React.FunctionComponent = () => (
  <style dangerouslySetInnerHTML={{ __html: hydrateThemeCss }} />
);

export const Script: React.FunctionComponent = () => (
  <script dangerouslySetInnerHTML={{ __html: hydrateThemeScript }} />
);
