// import useAuthorizationCheck from './CheckAuthorization';

interface NavbarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  toggleDarkMode: () => void; // modo escuro
  isDarkMode: boolean; // adiciona o estado do modo escuro
}

const Navbar: React.FC<NavbarProps> = ({
  toggleMenu,
  isMenuOpen,
  // toggleDarkMode,
  // isDarkMode,
}) => {
  // const authorizationChecked = useAuthorizationCheck();


  return (
    <nav className="w-full bg-[#3e5875] h-16 text-white fixed top-0 left-0 z-[1001] shadow-lg">
      <div className="h-full mx-auto px-4 flex items-center shadow-lg">
        {/* Menu Icon e Links de Navegação */}
        <div className="flex justify-between w-full">
          <div className="flex relative w-2/12 items-center">
            <button
              className="absolute group mr-4"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div
                className={`relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ${isMenuOpen ? 'ring-4' : ''
                  } ring-opacity-30 duration-200 shadow-md`}
              >
                <div className="flex flex-col justify-between w-[15px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div
                    className={`bg-white h-[1.5px] w-6 transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-[42deg]' : ''
                      }`}
                  ></div>
                  <div
                    className={`bg-white h-[1.5px] w-1/2 rounded transform transition-all duration-300 ${isMenuOpen ? '-translate-x-10' : ''
                      }`}
                  ></div>
                  <div
                    className={`bg-white h-[1.5px] w-6 transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-[42deg]' : ''
                      }`}
                  ></div>
                </div>
              </div>
            </button>


            {/* Botão de Modo Escuro
          <button
            className={`ml-auto w-12 h-6 justify-self-end flex items-center rounded-full transition duration-300 ${isDarkMode ? 'bg-[#111827]' : 'bg-gray-400'
              }`}
            onClick={toggleDarkMode}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button> */}


          </div>


          <div className="place-self-center w-8/12 place-content-center flex">
            <img src="src/assets/images/ChatGPT_Image_17_de_abr._de_2025__09_15_09-removebg-preview.png" className="h-16" alt="" />
            <p className=' place-self-center text-2xl font-semibold m-4 '>SISTEMA DE ADMISSÃO DIGITAL</p>
          </div>




          <div className='flex w-2/12 space-x-5 justify-end'>
            <div className='flex'>
              <div className='place-self-center'>
                <p>{localStorage.getItem('userName')}</p>
              </div>
              <div className='place-self-center border-2 rounded-full p-1 ml-1'>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
              </div>
            </div>
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
