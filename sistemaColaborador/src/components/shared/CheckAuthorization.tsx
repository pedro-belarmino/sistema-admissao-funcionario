/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../../../shareUrl';

const useAuthorizationCheck = () => {

  const navigate = useNavigate();
  const url = `${baseUrl}go/page?token=${localStorage.getItem('sessionToken')}`;

  const authorizationChecked = async (path: string) => {

    try {
      const response = await axios.get(url, {
      }
      );

      if (response.status == 200) {
        navigate(path);
      }

    }
    catch (error: any) {

      if (error.response?.status === 404) {
        console.log('404');
        localStorage.removeItem('token')
      } else if (error.response?.status === 401) {
        console.log('Erro de credenciais');
        navigate('/login');
        localStorage.removeItem('token')
      } else {
        console.error("Erro ao verificar a autorização:", error);
        navigate('/login');
        localStorage.removeItem('token')
      }
    }
    // navigate(path)
  };

  return authorizationChecked;
};

export default useAuthorizationCheck;
