import * as React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

function NotFoundPage() {
  const originalTitleRef = React.useRef(document?.title ?? null);
  const originalDescriptionRef = React.useRef(
    document
      ?.querySelector('meta[name="description"]')
      ?.getAttribute('content') ?? null,
  );

  React.useEffect(() => {
    const originalTitle = originalTitleRef.current ?? '';
    const originalDescription = originalDescriptionRef.current ?? '';

    document.title = 'Dead Link';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Nothing here.');

    return () => {
      document.title = originalTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', originalDescription);
    };
  }, []);

  return (
    <article className="flex md:justify-center">
      <section className="w-[48rem] border-l-8 border-dark pl-8 dark:border-light">
        <h2 className="mt-0 mb-16 text-4xl font-bold italic text-gray-500 dark:text-gray-400 lg:text-5xl">
          404
        </h2>
        <p className="my-16 text-xl font-light text-medium dark:text-bright lg:text-2xl">
          Sorry, but the page you requested could not be found.
        </p>
        <nav className="mt-16 text-right">
          <button
            className="group inline-flex items-center justify-between px-1 py-px text-dark dark:text-light"
            type="button"
            onClick={() => window.history.back()}
          >
            <FaChevronLeft className="text-xl lg:text-[1.625rem]" />{' '}
            <span className="ml-2 border-b border-current font-sans text-base transition-shadow duration-300 group-hover:shadow-growing-underline group-focus:shadow-growing-underline lg:ml-4 lg:text-xl">
              Go Back
            </span>
          </button>
        </nav>
      </section>
    </article>
  );
}

export default NotFoundPage;
