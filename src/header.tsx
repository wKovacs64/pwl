import { FiSun } from 'react-icons/fi';
import AlertOnUpdate from './alert-on-update';

function Header() {
  const handleThemeToggle = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    window.localStorage.setItem('darkMode', String(!isCurrentlyDark));
    if (isCurrentlyDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header>
      <AlertOnUpdate />
      <section className="relative flex md:justify-center pt-4 px-4 md:p-0">
        <h1 className="font-heading font-bold text-4xl m-0 md:text-5xl md:mt-16 lg:text-[5rem] text-dark dark:text-light small-caps text-shadow-medium dark:text-shadow-bright">
          Password Lense
        </h1>
        <button
          className="group absolute top-4 right-4 p-2 dark:text-gray-100"
          type="button"
          onClick={handleThemeToggle}
        >
          <FiSun
            className="transform transition-transform duration-500 ease-in-out group-hover:rotate-180"
            role="img"
            title="Toggle Dark Theme"
            size={32}
          />
        </button>
      </section>
    </header>
  );
}

export default Header;
