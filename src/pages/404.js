import React from 'react';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FaChevronLeft } from 'react-icons/fa';
import mq from '../utils/mq';
import Layout from '../components/layout';

const Section = styled.section`
  border-left-style: solid;
  border-width: 0.5rem;
  border-color: ${({ theme }) => theme.colors.headline};
  padding-left: 2rem;
  width: 48rem;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.brandedText};
  margin: 4rem 0;
  font-weight: 300;
  font-size: 1.25rem;
  ${mq.lg} {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.colors.headline};
  background-color: transparent;
`;

const ButtonIcon = styled(FaChevronLeft)`
  font-size: 1.25rem; /* size={20} */
  ${mq.lg} {
    font-size: 1.625rem; /* size={26} */
  }
`;

const ButtonText = styled.span`
  margin-left: 0.5rem;
  font-family: sans-serif;
  font-size: 1rem;
  ${mq.lg} {
    margin-left: 1rem;
    font-size: 1.25rem;
  }
  border-width: 0 0 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.headline};
  transition: box-shadow 0.3s ease;
  button:hover &, /* inside a focused <button> */
  button:focus & /* inside a hovered <button> */ {
    box-shadow: inset 0 -2px 0 0 ${({ theme }) => theme.colors.headline};
  }
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.dullText};
  font-style: italic;
  margin-top: 0;
  margin-bottom: 4rem;
  font-size: 2.25rem;
  ${mq.lg} {
    font-size: 3rem;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title="Dead Link"
      meta={[{ name: 'description', content: 'Nothing here.' }]}
    />
    <article
      css={css`
        display: flex;
        ${mq.md} {
          justify-content: center;
        }
      `}
    >
      <Section>
        <H2>404</H2>
        <P>Sorry, but the page you requested could not be found.</P>
        <nav
          css={css`
            margin-top: 4rem;
            text-align: right;
          `}
        >
          <Button onClick={() => window.history.back()} type="button">
            <ButtonIcon /> <ButtonText>Go Back</ButtonText>
          </Button>
        </nav>
      </Section>
    </article>
  </Layout>
);

export default NotFoundPage;
