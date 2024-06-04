import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex justify-center">
      <a className="group p-2" href="https://github.com/wKovacs64/pwl" rel="noopener noreferrer">
        <FaGithub
          className="transition-transform duration-500 ease-in-out group-hover:rotate-[1turn]"
          role="img"
          title="View source on GitHub"
          aria-label="View source on GitHub"
          size={32}
        />
      </a>
    </footer>
  );
}

export default Footer;
