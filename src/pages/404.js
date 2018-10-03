import React from 'react';
import Helmet from 'react-helmet';
import { css } from 'react-emotion';
import { Link } from 'gatsby';
import { FaChevronLeft } from 'react-icons/fa';
import mq from '../utils/mq';
import Layout from '../components/layout';

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title="Dead Link"
      meta={[{ name: 'description', content: 'Nothing here.' }]}
    />
    <article
      className={css`
        display: flex;
        ${mq.md(css`
          justify-content: center;
        `)};
      `}
    >
      <section
        className={css`
          border-left-style: solid;
          border-color: #1c304a;
          border-width: 0.5rem;
          padding-left: 2rem;
          width: 48rem;
        `}
      >
        <h2
          className={css`
            color: #777777;
            font-style: italic;
            margin-top: 0;
            margin-bottom: 4rem;
            font-size: 2.25rem;
            ${mq.lg(css`
              font-size: 3rem;
            `)};
          `}
        >
          404
        </h2>
        <p
          className={css`
            color: #046b99;
            margin: 4rem 0;
            font-weight: 300;
            font-size: 1.25rem;
            ${mq.lg(css`
              font-size: 1.5rem;
            `)};
          `}
        >
          Sorry, but the page you requested could not be found.
        </p>
        <nav
          className={css`
            margin-top: 4rem;
            text-align: right;
          `}
        >
          <Link
            to="/"
            className={css`
              display: inline-flex;
              align-items: flex-end;
              justify-content: space-between;
              color: #046b99;
              text-decoration: none;
              border-width: 0;
              background-color: transparent;
              transition: color 0.3s ease;
              &:hover {
                color: #00cfff;
                cursor: pointer;
              }
            `}
          >
            <FaChevronLeft
              className={css`
                font-size: 1.25rem; /* size={20} */
                ${mq.lg(css`
                  font-size: 1.625rem; /* size={26} */
                `)};
              `}
            />{' '}
            <span
              className={css`
                margin-left: 0.5rem;
                font-family: sans-serif;
                font-size: 1rem;
                ${mq.lg(css`
                  margin-left: 1rem;
                  font-size: 1.25rem;
                `)};
              `}
            >
              Back to the Site
            </span>
          </Link>
        </nav>
      </section>
    </article>
  </Layout>
);

export default NotFoundPage;
