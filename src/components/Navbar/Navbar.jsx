import { NavLink, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImg from '../../assets/images/freshcart-logo.svg'

const Navbar = () => {
  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <Link
          to=''
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logoImg}
            className="h-7"
            alt="Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        <div className="hidden grow md:flex justify-around md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/product"
                className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cart"
                className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Cart
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/brands"
                className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Brands
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/category"
                className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Category
              </NavLink>
            
            </li>
            
          </ul>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:items-center md:space-x-4 rtl:space-x-reverse md:mt-0 md:bg-neutral-primary">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white bg-black flex items-center justify-center w-5 h-5 rounded-full border border-black">
                <FontAwesomeIcon icon={['fab', 'facebook-f']} className="text-xs" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-black block">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-black block">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-black block">
                <FontAwesomeIcon icon={['fab', 'youtube']} />
              </a>
            </li>

            <li>
              <NavLink to="/login" className="text-black block py-2 px-3 md:p-0">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="text-black block py-2 px-3 md:p-0">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="text-black block py-2 px-3 md:p-0">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
