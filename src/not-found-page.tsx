import * as React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function NotFoundPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Dead Link</title>
        <meta name="description" content="Nothing here." />
      </Helmet>
      <article className="flex md:justify-center">
        <section className="pl-8 w-[48rem] border-l-8 border-dark dark:border-light">
          <h2 className="mt-0 mb-16 font-bold italic text-4xl lg:text-5xl text-gray-500 dark:text-gray-400">
            404
          </h2>
          <p className="my-16 font-light text-xl lg:text-2xl text-medium dark:text-bright">
            Sorry, but the page you requested could not be found.
          </p>
          <nav className="mt-16 text-right">
            <button
              className="group px-1 py-px inline-flex items-center justify-between text-dark dark:text-light"
              type="button"
              onClick={() => window.history.back()}
            >
              <FaChevronLeft className="text-xl lg:text-[1.625rem]" />{' '}
              <span className="ml-2 lg:ml-4 font-sans text-base lg:text-xl border-b border-current transition-shadow duration-300 group-hover:shadow-growing-underline group-focus:shadow-growing-underline">
                Go Back
              </span>
            </button>
          </nav>
        </section>
      </article>
    </React.Fragment>
  );
}

export default NotFoundPage;
