import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';

const SourceLink = styled.a`
  color: ${({ theme }) => theme.colors.pageText};
  text-decoration: none;
`;

const SourceLinkIcon = styled(FaGithub)`
  transition: transform 0.5s ease-in-out;
  a:hover &,
  a:focus & {
    transform: rotate(360deg);
  }
`;

const Footer = () => (
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
