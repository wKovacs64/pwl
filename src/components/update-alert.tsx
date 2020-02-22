import React from 'react';
import styled from '@emotion/styled';
import mq from '../utils/mq';
import { light, dark } from '../theme';

const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
  border-style: solid;
  border-width: 0 0 1px;
  transition: color 0.3s ease, background-color 0.3s ease;
  body.light-mode & {
    border-color: ${light.colors.alertBorder};
    box-shadow: 4px 4px 8px 0px ${light.colors.alertShadow};
    color: ${light.colors.alertText};
    background-color: ${light.colors.alertBackground};
    &:hover,
    &:focus-within {
      color: ${light.colors.alertBackground};
      background-color: ${light.colors.alertText};
    }
  }
  body.dark-mode & {
    border-color: ${dark.colors.alertBorder};
    box-shadow: 4px 4px 8px 0px ${dark.colors.alertShadow};
    color: ${dark.colors.alertText};
    background-color: ${dark.colors.alertBackground};
    &:hover,
    &:focus-within {
      color: ${dark.colors.alertBackground};
      background-color: ${dark.colors.alertText};
    }
  }
`;

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
  <AlertContainer>
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
  </AlertContainer>
);

export default UpdateAlert;
