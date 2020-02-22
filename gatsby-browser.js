/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import ReactDOM from 'react-dom';
import UpdateAlert from './src/components/update-alert';

export const onServiceWorkerUpdateReady = () => {
  // 1. Create a temporary `div` element for ReactDOM to use as a container.
  // 2. Find and store the document `header` element.
  // 3. Render <UpdateAlert /> to the temporary `div` from step 1.
  // 4. Leverage the ReactDOM.render() callback to insert the children of the
  //    temporary `div` (<UpdateAlert /> itself) as the first element of the
  //    `header`. Dismissal will remove the element.

  const tempUpdateAlertRoot = document.createElement('div');
  const header = document.body.getElementsByTagName('header').item(0);

  ReactDOM.render(
    <UpdateAlert
      siteTitle={document.title}
      onReload={() => {
        window.location.reload(true);
      }}
      onDismiss={() => {
        header.removeChild(header.firstChild);
      }}
    />,
    tempUpdateAlertRoot,
    () => {
      const updateAlert = tempUpdateAlertRoot.firstChild;
      header.insertBefore(updateAlert, header.firstChild);
    },
  );
};
