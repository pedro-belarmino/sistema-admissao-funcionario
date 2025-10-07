import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../../../shareUrl';

const useAuthorizationCheck = () => {

  const navigate = useNavigate();
  const url = `${baseUrl}go`;

  const authorizationChecked = async (path: string) => {

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'opbase-id': localStorage.getItem('operationalBase')
        },
      }
      );

      if (response.status == 200) {
        navigate(path);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
      }

    }
    catch (error: any) {

      if (error.response?.status === 404) {
        console.log('404');
        localStorage.removeItem('token')
        location.reload()
      } else if (error.response?.status === 401) {
        console.log('Erro de credenciais');
        navigate('/login');
        localStorage.removeItem('token')
        location.reload()
      } else {
        console.error("Erro ao verificar a autorização:", error);
        navigate('/login');
        localStorage.removeItem('token')
        location.reload()
      }
    }

    // navigate(path)
  };

  return authorizationChecked;
};

export default useAuthorizationCheck;