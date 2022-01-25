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
      <section className="relative flex px-4 pt-4 md:justify-center md:p-0">
        <h1 className="small-caps text-shadow-medium dark:text-shadow-bright m-0 font-heading text-4xl font-bold text-dark dark:text-light md:mt-16 md:text-5xl lg:text-[5rem]">
          Password Lense
        </h1>
        <button
          className="group absolute top-4 right-4 p-2"
          type="button"
          onClick={handleThemeToggle}
        >
          <FiSun
            className="transition-transform duration-500 ease-in-out group-hover:rotate-180"
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
