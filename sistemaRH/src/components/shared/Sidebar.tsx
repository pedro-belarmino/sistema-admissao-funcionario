import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

interface SidebarProps {
  isMenuOpen: boolean;
  isHomeSubMenuOpen: boolean;
  toggleHomeSubMenu: () => void;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMenuOpen,
  isHomeSubMenuOpen,
  toggleHomeSubMenu,
  toggleMenu,
}) => {
  const [subMenusOpen, setSubMenusOpen] = useState<{ [key: string]: boolean }>({
    home1: false,
    home2: false,
    home3: false,
  });

  const toggleSubMenu = (menuKey: string) => {
    setSubMenusOpen((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const navigate = useNavigate()

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu} // Fecha o menu ao clicar fora
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#4b6584] to-[#3e5875] w-[250px] text-white shadow-xl transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 z-50' : '-translate-x-full'
          }`}
      >
        {/* Top Header */}
        <div className="h-16 bg-blue-950/50 backdrop-blur-sm flex items-center px-6 border-b border-blue-700/30 shadow-md">
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold tracking-wide text-gray-200">.</span>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
          <ul className="py-4 px-2 space-y-2">

            <li>
              <Link
                to="/home"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg className="h-5 w-5 text-blue-200"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="5 12 3 12 12 3 21 12 19 12" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
                <span className="font-medium">
                  Home
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={toggleHomeSubMenu}
                className="w-full px-4 py-3 flex justify-between items-center rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
              >
                <span className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-blue-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span className="font-medium">Sistema</span>
                </span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${isHomeSubMenuOpen ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ul
                className={`mt-1 rounded-lg overflow-hidden transition-all duration-300 ${isHomeSubMenuOpen ? 'max-h-96' : 'max-h-0'
                  }`}
              >
                {/* Submenu de Perfil */}
                <li className="ml-2 mt-2">
                  <button
                    onClick={() => toggleSubMenu('perfil')}
                    className="w-full px-4 py-2.5 flex justify-between items-center rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                  >
                    <span className="text-sm font-medium text-blue-100">Perfil</span>
                    <svg
                      className={`h-4 w-4 transform transition-transform duration-300 ${subMenusOpen['perfil'] ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${subMenusOpen['perfil'] ? 'max-h-48' : 'max-h-0'
                      }`}
                  >
                    <li>
                      <Link
                        to="/perfil-formulario"
                        className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-row">
                          <svg
                            className="h-5 w-5 text-blue-200 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Criar
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1">
                      <Link
                        to="/perfil-lista"
                        className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-row">
                          <svg
                            className="h-5 w-5 text-blue-200 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          Pesquisar
                        </div>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Submenu de Usuário */}
                <li className="ml-2 mt-2">
                  <button
                    onClick={() => toggleSubMenu('usuario')}
                    className="w-full px-4 py-2.5 flex justify-between items-center rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                  >
                    <span className="text-sm font-medium text-blue-100">Usuário</span>
                    <svg
                      className={`h-4 w-4 transform transition-transform duration-300 ${subMenusOpen['usuario'] ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <ul
                    className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${subMenusOpen['usuario'] ? 'max-h-48' : 'max-h-0'
                      }`}
                  >
                    <li>
                      <Link
                        to="/usuario-formulario"
                        className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-row">
                          <svg
                            className="h-5 w-5 text-blue-200 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Criar
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1">
                      <Link
                        to="/usuario-lista"
                        className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-row">
                          <svg
                            className="h-5 w-5 text-blue-200 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          Pesquisar
                        </div>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            {/* ------------ */}
            <li>
              <Link
                to="/lista-template"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg className="h-5 w-5 text-blue-200"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                  <line x1="8" y1="8" x2="12" y2="8" />
                  <line x1="8" y1="12" x2="12" y2="12" />
                  <line x1="8" y1="16" x2="12" y2="16" />
                </svg>
                <span className="font-medium">
                  Template de Vaga
                </span>
              </Link>
            </li>
            {/* ------------ */}
            <li>
              <button
                onClick={() => navigate('/base-operacional', {
                  state: {
                    page: 'contratacao'
                  }
                })}
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg
                  className="h-5 w-5 text-blue-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>

                <span className="font-medium">
                  Cadastro Contratação
                </span>
              </button>
            </li>


            <li>
              <Link
                to="/edicao-contratacao"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">
                  Edição de Contratação
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/validacao-do-processo"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg className="h-5 w-5  text-blue-200"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                  />
                  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="4"
                    rx="2"
                  />
                  <line
                    x1="9"
                    y1="12"
                    x2="9.01"
                    y2="12"
                  />
                  <line
                    x1="13"
                    y1="12"
                    x2="15"
                    y2="12"
                  />
                  <line
                    x1="9"
                    y1="16"
                    x2="9.01"
                    y2="16"
                  />
                  <line
                    x1="13"
                    y1="16"
                    x2="15"
                    y2="16"
                  />
                </svg>
                <span className="font-medium">
                  Validação de Processo
                </span>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/abcdefghijklmnopqrstuvwxyz"
                target="_blank"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg className="h-5 w-5 text-blue-200"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="17" x2="12" y2="17.01" />
                  <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                </svg>
                <span className="font-medium">
                  FAQ
                </span>
              </Link>
            </li> */}
            {localStorage.getItem('userId') == '1' && (
              <li>
                <Link
                  to="/criar-base-operacional"
                  className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
                >
                  <svg className="h-5 w-5 text-blue-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>

                  <span className="font-medium text-xs">
                    CRIAR BASE OPERACIONAL
                  </span>
                </Link>
              </li>
            )}

            {/* Logout */}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
