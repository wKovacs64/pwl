import * as React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

function NotFoundPage() {
  const originalTitleRef = React.useRef(document.title);
  const originalDescriptionRef = React.useRef(
    document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
  );

  React.useEffect(() => {
    const originalTitle = originalTitleRef.current;
    const originalDescription = originalDescriptionRef.current ?? '';

    document.title = 'Dead Link';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Nothing here.');

    return () => {
      document.title = originalTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', originalDescription);
    };
  }, []);

  return (
    <article className="flex md:justify-center">
      <section className="border-dark dark:border-light w-[48rem] border-l-8 pl-8">
        <h2 className="mt-0 mb-16 text-4xl font-bold text-gray-500 italic lg:text-5xl dark:text-gray-400">
          404
        </h2>
        <p className="text-medium dark:text-bright my-16 text-xl font-light lg:text-2xl">
          Sorry, but the page you requested could not be found.
        </p>
        <nav className="mt-16 text-right">
          <button
            className="group text-dark dark:text-light inline-flex items-center justify-between px-1 py-px"
            type="button"
            onClick={() => window.history.back()}
          >
            <FaChevronLeft className="text-xl lg:text-[1.625rem]" />{' '}
            <span className="group-hover:shadow-growing-underline group-focus:shadow-growing-underline ml-2 border-b border-current font-sans text-base transition-shadow duration-300 lg:ml-4 lg:text-xl">
              Go Back
            </span>
          </button>
        </nav>
      </section>
    </article>
  );
}

export default NotFoundPage;
