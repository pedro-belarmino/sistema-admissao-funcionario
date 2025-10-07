import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import { useState, useEffect } from "react";

const Template: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeSubMenuOpen, setIsHomeSubMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleHomeSubMenu = () => {
    setIsHomeSubMenuOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''} transition-all duration-500`}
    >
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      <div id="campinho" className="flex-grow flex">
        <Sidebar
          isMenuOpen={isMenuOpen}
          isHomeSubMenuOpen={isHomeSubMenuOpen}
          toggleHomeSubMenu={toggleHomeSubMenu}
          toggleMenu={toggleMenu}
        />
        <main className="flex-grow">
          <div className="h-max w-full bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </div >

        </main>
      </div>

    </div>
  );
};

export default Template;
