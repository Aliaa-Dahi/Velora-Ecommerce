import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../../assets/images/freshcart-logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-neutral-white fixed w-full z-20 top-0 start-0 border-b border-neutral-border shadow-xs">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoImg} className="h-7" alt="Logo" />
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-muted rounded-base md:hidden hover:bg-neutral-bg-soft hover:text-text-heading focus:outline-none focus:ring-2 focus:ring-neutral-border"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>

        <div className="hidden grow md:flex justify-around md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-neutral-border rounded-base bg-neutral-bg-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-white">
            {[
              { to: "/", label: "Home" },
              { to: "/product", label: "Products" },
              { to: "/cart", label: "Cart" },
              { to: "/brands", label: "Brands" },
              { to: "/category", label: "Category" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block py-2 px-3 md:p-0 transition-colors ${
                      isActive ? "text-primary font-semibold" : "text-text-muted hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:items-center md:space-x-4 rtl:space-x-reverse md:mt-0 md:bg-neutral-white">
            {[
              { href: "https://facebook.com", icon: ["fab", "facebook-f"] },
              { href: "https://twitter.com", icon: ["fab", "twitter"] },
              { href: "https://instagram.com", icon: ["fab", "instagram"] },
              { href: "https://youtube.com", icon: ["fab", "youtube"] },
            ].map(({ href, icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-heading transition-colors block">
                  <FontAwesomeIcon icon={icon} />
                </a>
              </li>
            ))}
            <li>
              <NavLink to="/login" className="text-text-muted hover:text-primary block py-2 px-3 md:p-0 transition-colors">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="text-text-muted hover:text-primary block py-2 px-3 md:p-0 transition-colors">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="text-text-muted hover:text-primary block py-2 px-3 md:p-0 transition-colors">
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
