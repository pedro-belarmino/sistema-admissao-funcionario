//VER SE AINDA EXISTE USABILIDADE!!!!!!

import { createContext, useContext, useState, ReactNode } from 'react';

// Definir o tipo do contexto
interface UserContextType {
  userLogin: string;
  setUserLogin: (login: string) => void;
  message: string; // propriedade message
  setMessage: (message: string) => void; // atualizar a mensagem
}

// criar contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

//acessar  contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('erro');
  }
  return context;
};

// provider para envolver a aplicação
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userLogin, setUserLogin] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, message, setMessage }}>
      {children}
    </UserContext.Provider>
  );
};
