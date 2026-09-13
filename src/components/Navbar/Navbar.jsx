import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../../assets/images/freshcart-logo.svg";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-white fixed w-full z-20 top-0 start-0 border-b border-neutral-border shadow-xs">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoImg} className="h-7" alt="Logo" />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-muted rounded-base md:hidden hover:bg-neutral-bg-soft hover:text-text-heading focus:outline-none focus:ring-2 focus:ring-neutral-border"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>

        {/* Menu */}
        <div className={`${menuOpen ? "flex" : "hidden"} w-full md:flex md:w-auto md:grow flex-col md:flex-row md:justify-around mt-3 md:mt-0`}>
          {/* Nav links */}
          <ul className="font-medium flex flex-col md:flex-row md:items-center md:space-x-6 gap-1 md:gap-0 border border-neutral-border md:border-0 rounded-base md:rounded-none bg-neutral-bg-soft md:bg-transparent p-3 md:p-0">
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
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 md:px-0 rounded-base md:rounded-none transition-colors text-sm ${
                      isActive ? "text-primary font-semibold bg-primary-soft md:bg-transparent" : "text-text-muted hover:text-primary hover:bg-neutral-bg-medium md:hover:bg-transparent"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side: social + auth */}
          <ul className="font-medium flex flex-row flex-wrap items-center gap-3 md:gap-4 mt-3 md:mt-0 px-3 md:px-0">
            {[
              { href: "https://facebook.com",  icon: ["fab", "facebook-f"] },
              { href: "https://twitter.com",   icon: ["fab", "twitter"] },
              { href: "https://instagram.com", icon: ["fab", "instagram"] },
              { href: "https://youtube.com",   icon: ["fab", "youtube"] },
            ].map(({ href, icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-heading transition-colors block text-sm">
                  <FontAwesomeIcon icon={icon} />
                </a>
              </li>
            ))}
            <li>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-text-muted hover:text-primary text-sm transition-colors">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="text-text-muted hover:text-primary text-sm transition-colors">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" onClick={() => setMenuOpen(false)} className="text-text-muted hover:text-primary text-sm transition-colors">
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
