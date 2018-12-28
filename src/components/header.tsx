import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FiSun } from 'react-icons/fi';
import styled from '../utils/styled';
import mq from '../utils/mq';
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
  color: ${({ theme }) => theme.colors.pageText};
  background-color: transparent;
  border: none;
  padding: 0.5rem;
`;

const ThemeToggleButtonIcon = styled(FiSun)`
  transition: transform 0.5s ease-in-out;
  button:hover & {
    transform: rotate(180deg);
  }
`;

const H1 = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 2.25rem;
  font-variant: small-caps;
  color: ${({ theme }) => theme.colors.headline};
  text-shadow: 1px 1px 1px ${({ theme }) => theme.colors.headlineShadow};
  margin: 0;
  ${mq.md} {
    font-size: 3rem;
    margin-top: 4rem;
  }
  ${mq.lg} {
    font-size: 5rem;
  }
`;

type HeaderProps = {
  onThemeToggle: () => void;
};

const Header: React.FunctionComponent<HeaderProps> = ({ onThemeToggle }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
  >
    {({ site: { siteMetadata } }) => (
      <header>
        <AlertOnUpdate />
        <HeaderContent>
          <H1>{siteMetadata.title}</H1>
          <ThemeToggleButton onClick={onThemeToggle}>
            <ThemeToggleButtonIcon aria-label="Toggle Dark Theme" size={32} />
          </ThemeToggleButton>
        </HeaderContent>
      </header>
    )}
  </StaticQuery>
);

export default Header;
