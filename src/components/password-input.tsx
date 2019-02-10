import React from 'react';
import styled from '@emotion/styled';
import mq from '../utils/mq';
import { light, dark } from '../theme';

const Input = styled.input`
  font-family: 'Courier New', Courier, monospace;
  padding: 1rem;
  text-align: center;
  letter-spacing: 0.25rem;
  white-space: pre;
  width: 100%;
  font-size: 1.25rem;
  ${mq.md} {
    font-size: 1.5rem;
  }
  ${mq.lg} {
    font-size: 2.25rem;
  }
  &::-ms-clear {
    display: none;
  }
  body.light-mode & {
    color: ${light.colors.pageText};
    background-color: ${light.colors.inputBackground};
    border: 2px solid ${light.colors.inputBorder};
    &::placeholder {
      color: ${light.colors.dullText};
    }
  }
  body.dark-mode & {
    color: ${dark.colors.pageText};
    background-color: ${dark.colors.inputBackground};
    border: 2px solid ${dark.colors.inputBorder};
    &::placeholder {
      color: ${dark.colors.dullText};
    }
  }
`;

interface PasswordInputProps {
  password: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler;
}

const PasswordInput: React.FunctionComponent<PasswordInputProps> = ({
  password,
  onChange,
  onKeyDown,
  ...props
}) => (
  <div {...props}>
    <Input
      aria-label="Password"
      placeholder="Paste Here"
      type="text"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={password}
    />
  </div>
);

PasswordInput.defaultProps = {
  password: '',
  onKeyDown: () => {},
};

export default PasswordInput;
