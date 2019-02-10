import React from 'react';
import styled from '@emotion/styled';
import mq from '../utils/mq';

const Alert = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const AlertMessage = styled.span`
  padding: 0 0.5rem;
`;

const AlertButtonContainer = styled.section`
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  ${mq.md} {
    width: auto;
  }
`;

const AlertButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  color: currentColor;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
`;

const AlertButtonLabel = styled.span`
  border-bottom: 1px solid;
`;

interface UpdateAlertProps {
  siteTitle: string;
  onReload: () => void;
  onDismiss: () => void;
}

const UpdateAlert: React.FunctionComponent<UpdateAlertProps> = ({
  siteTitle,
  onReload,
  onDismiss,
}) => (
  <Alert aria-live="polite" role="alert">
    <AlertMessage>A new version of {siteTitle} is available!</AlertMessage>
    <AlertButtonContainer>
      <AlertButton type="button" onClick={onReload}>
        <AlertButtonLabel>Reload</AlertButtonLabel>
      </AlertButton>
      <AlertButton type="button" onClick={onDismiss}>
        <AlertButtonLabel>Dismiss</AlertButtonLabel>
      </AlertButton>
    </AlertButtonContainer>
  </Alert>
);

export default UpdateAlert;
