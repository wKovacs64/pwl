import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';

const SourceLink = styled.a`
  color: ${({ theme }) => theme.colors.pageText};
  text-decoration: none;
  padding: 0.5rem;
`;

const SourceLinkIcon = styled(FaGithub)`
  transition: transform 0.5s ease-in-out;
  a:hover & {
    transform: rotate(360deg);
  }
`;

const Footer: React.FunctionComponent = () => (
  <footer
    css={css`
      display: flex;
      justify-content: center;
    `}
  >
    <SourceLink
      href="https://github.com/wKovacs64/pwl"
      rel="noopener noreferrer"
    >
      <SourceLinkIcon aria-label="View source on GitHub" size={32} />
    </SourceLink>
  </footer>
);

export default Footer;
