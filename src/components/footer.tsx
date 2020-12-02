import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';
import { light, dark } from '../theme';

const SourceLink = styled.a`
  text-decoration: none;
  padding: 0.5rem;
  body.light-mode & {
    color: ${light.colors.pageText};
  }
  body.dark-mode & {
    color: ${dark.colors.pageText};
  }
`;

const SourceLinkIcon = styled(FaGithub)`
  transition: transform 0.5s ease-in-out;
  a:hover & {
    transform: rotate(1turn);
  }
`;

function Footer(): JSX.Element {
  return (
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
}

export default Footer;
