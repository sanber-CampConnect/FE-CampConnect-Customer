import Logo from "../../assets/images/logo.png";
import { useState, useEffect } from "react";
import { OutlineButton } from "../atoms/Buttons";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeScrolled = () => {
    if (window.scrollY >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeScrolled);
    return () => {
      window.removeEventListener("scroll", changeScrolled);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          isScrolled || isMenuOpen ? "bg-opacity-60 backdrop-blur-lg" : ""
        } z-50 fixed top-0 left-0 w-screen bg-white duration-300 transition-all`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={Logo}
                className="h-8 w-auto"
                alt="Kade Outdoor Malang"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg hover:bg-gray-100"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex flex-row space-x-8 font-medium rtl:space-x-reverse">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/catalogue"
                  className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                >
                  Katalog
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                >
                  Keranjang
                </a>
              </li>
              <li>
                <a
                  href="/order"
                  className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                >
                  Order
                </a>
              </li>
              {/* <li>
                <a
                  href="/info"
                  className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                >
                  Informasi
                </a>
              </li> */}
              {user && (
                <li>
                  <a
                    href="/profile"
                    className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                  >
                    Profil
                  </a>
                </li>
              )}
            </ul>
            {!user && (
              <div className="button-login">
                <a href="/auth/login">
                  <OutlineButton text="Login" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col items-start w-full md:hidden p-4 z-50">
            <ul className="flex flex-col space-y-4 font-medium mb-6 z-50">
              <li>
                <a
                  href="/"
                  className="block p-2 text-primary rounded hover:text-secondary"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/catalogue"
                  className="block p-2 text-primary rounded hover:text-secondary"
                >
                  Katalog
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="block p-2 text-primary rounded hover:text-secondary"
                >
                  Keranjang
                </a>
              </li>
              <li>
                <a
                  href="/order"
                  className="block p-2 text-primary rounded hover:text-secondary"
                >
                  Order
                </a>
              </li>
              {/* <li>
                <a
                  href="/info"
                  className="block p-2 text-primary rounded hover:text-secondary"
                >
                  Informasi
                </a>
              </li> */}
              {user && (
                <li>
                  <a
                    href="/profile"
                    className="block py-2 px-3 text-primary rounded md:p-0 hover:text-secondary"
                  >
                    Profil
                  </a>
                </li>
              )}
            </ul>
            {!user && (
              <div className="button-login">
                <a href="/auth/login">
                  <OutlineButton text="Login" className="border-secondary" />
                </a>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
