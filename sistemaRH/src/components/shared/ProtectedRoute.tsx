import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthorizationCheck from './CheckAuthorization';
// import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}


// const navigate = useNavigate();
// navigate('void')

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children = '/accessDenied' }) => {
  const authorizationChecked = useAuthorizationCheck();
  const location = useLocation();

  useEffect(() => {
    const checkAuthorization = async () => {
      await authorizationChecked(location.pathname); // location + pathname relaciona url com compomente (Y)
    };
    checkAuthorization();
  }, []);   //REMOÇÃO DA DEPENDENCIA PRA PARAR DE ENTRAR EM LOOP --------------> authorizationChecked, location.pathname

  return <>{children}</>;
};

export default ProtectedRoute;