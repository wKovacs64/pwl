import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import mq from '../utils/mq';

const Input = styled.input`
  font-family: 'Courier New', Courier, monospace;
  padding: 1rem;
  text-align: center;
  letter-spacing: 0.25rem;
  white-space: pre;
  color: ${({ theme }) => theme.colors.pageText};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 2px solid ${({ theme }) => theme.colors.inputBorder};
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
  &::placeholder {
    color: ${({ theme }) => theme.colors.dullText};
  }
`;

const PasswordInput = ({ password, onChange, onKeyDown, ...props }) => (
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

PasswordInput.propTypes = {
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

PasswordInput.defaultProps = {
  password: '',
  onKeyDown: () => {},
};

export default PasswordInput;
