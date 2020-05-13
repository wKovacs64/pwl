import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FiSun } from 'react-icons/fi';
import styled from '@emotion/styled';
import { light, dark } from '../theme';
import { mq } from '../utils';
import AlertOnUpdate from './alert-on-update';

const HeaderContent = styled.section`
  position: relative;
  display: flex;
  padding: 1rem 1rem 0;
  ${mq.md} {
    justify-content: center;
    padding: 0;
  }
`;

const ThemeToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  body.light-mode & {
    color: ${light.colors.pageText};
  }
  body.dark-mode & {
    color: ${dark.colors.pageText};
  }
`;

const ThemeToggleButtonIcon = styled(FiSun)`
  transition: transform 0.5s ease-in-out;
  button:hover & {
    transform: rotate(0.5turn);
  }
`;

const H1 = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 2.25rem;
  font-variant: small-caps;
  margin: 0;
  ${mq.md} {
    font-size: 3rem;
    margin-top: 4rem;
  }
  ${mq.lg} {
    font-size: 5rem;
  }
  body.light-mode & {
    color: ${light.colors.headline};
    text-shadow: 1px 1px 1px ${light.colors.headlineShadow};
  }
  body.dark-mode & {
    color: ${dark.colors.headline};
    text-shadow: 1px 1px 1px ${dark.colors.headlineShadow};
  }
`;

interface HeaderProps {
  onThemeToggle: () => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({ onThemeToggle }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header>
      <AlertOnUpdate />
      <HeaderContent>
        <H1>{siteMetadata.title}</H1>
        <ThemeToggleButton onClick={onThemeToggle}>
          <ThemeToggleButtonIcon aria-label="Toggle Dark Theme" size={32} />
        </ThemeToggleButton>
      </HeaderContent>
    </header>
  );
};

export default Header;
