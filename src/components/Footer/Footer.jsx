import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/freshcart-logo.svg";

const Footer = () => {
  const socials = [
    { href: "https://facebook.com",  icon: ["fab", "facebook-f"],  label: "Facebook" },
    { href: "https://twitter.com",   icon: ["fab", "twitter"],     label: "Twitter" },
    { href: "https://instagram.com", icon: ["fab", "instagram"],   label: "Instagram" },
    { href: "https://youtube.com",   icon: ["fab", "youtube"],     label: "YouTube" },
  ];

  const links = [
    { to: "/",        label: "Home" },
    { to: "/product", label: "Products" },
    { to: "/cart",    label: "Cart" },
    { to: "/brands",  label: "Brands" },
  ];

  return (
    <footer className="bg-neutral-bg-soft border-t border-neutral-border mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img src={logoImg} className="h-7 w-fit" alt="Logo" />
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              Your one-stop shop for fresh groceries and everyday essentials, delivered fast.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-text-heading font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-text-muted text-sm hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social icons */}
          <div>
            <h4 className="text-text-heading font-semibold text-sm mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {socials.map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-neutral-white border border-neutral-border flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-2 text-text-muted text-xs">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
