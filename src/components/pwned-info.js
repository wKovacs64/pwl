import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import PwnedInfoSuspender from './pwned-info-suspender';

function PwnedInfo({ delayLoadingMs, password, ...props }) {
  return (
    <section data-testid="pwned-info" {...props}>
      <p>Public Exposure:</p>
      {password && (
        <ErrorBoundary
          FallbackComponent={() => (
            <p>
              <em>Public exposure information is currently unavailable.</em>
            </p>
          )}
        >
          <Suspense maxDuration={delayLoadingMs} fallback={<p>Loading...</p>}>
            <PwnedInfoSuspender password={password} />
          </Suspense>
        </ErrorBoundary>
      )}
    </section>
  );
}

PwnedInfo.propTypes = {
  delayLoadingMs: PropTypes.number,
  password: PropTypes.string.isRequired,
};

PwnedInfo.defaultProps = {
  delayLoadingMs: 750,
};

export default PwnedInfo;
