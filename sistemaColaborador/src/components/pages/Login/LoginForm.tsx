import ReCAPTCHA from 'react-google-recaptcha';
// 6Lcz_doqAAAAANMFHx3YdF6dDMNKDrjylmbQ9_c2
import '../../../index.css';
import Inputs from '../../shared/Inputs';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../../shareUrl';


const LoginForm: React.FC = () => {


  const navigate = useNavigate()
  const url = `${baseUrl}employee/page/login`;
  const [userLogin, setUserLogin] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const [capVal, setCapVal] = useState<any>(null);
  const [, setCaptchaError] = useState<string>('');
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState<string>('')
  const [token, setToken] = useState<string | null>(null)
  const [sessionToken, setSessionToken] = useState<string>('')

  const handleUserLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin(e.target.value)
    setError((prev) => ({ ...prev, userLogin: '' }));
  }

  const handleUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value)
    setError((prev) => ({ ...prev, userLogin: '' }));
  }

  const onChange = (value: string | null) => {
    setCapVal(value);
    setCaptchaError('');
  };

  useEffect(() => {
    const getUrl = window.location.href
    const getToken = new URL(getUrl)
    const tokenParam = getToken.searchParams.get('token')
    setSessionToken(tokenParam || '')
    localStorage.setItem('token', sessionToken)
    setToken(tokenParam)
  })


  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors: { [key: string]: string } = {};

    if (!capVal) validationErrors.captchaError = 'Confirme que você não é um robô';
    if (!userLogin) validationErrors.userLogin = 'Insira seu Login';
    if (!userPassword) validationErrors.userPassword = 'Insira sua Senha';

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors)
      return;
    };

    setError({});



    try {
      const response = await axios.post(url, {
        data: {
          username: userLogin,
          password: userPassword,
          token: token
        }
      });

      if (response.status === 200) {

        localStorage.setItem('sessionToken', response.data.token);
        localStorage.setItem('accessId', response.data.accessId);
        navigate('/home');

      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setLoginError('Credenciais Incorretas. Por favor, tente novamente.');
        } else {
          setLoginError('Erro no servidor. Por favor, tente novamente mais tarde.');
        }
      } else {
        setLoginError('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    }

  }




  return (
    <div>
      <div className='p-5'>
        <svg className="h-12 w-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

      </div>

      <h1 className='p-3 text-4xl pb-20 font-semibold'>Fazer Login</h1>

      <form onSubmit={loginSubmit} action='onSubmit' className='space-y-10'>
        <div>
          <Inputs
            type='text'
            name='userLogin'
            placeholder='Seu CPF'
            value={userLogin}
            onChange={handleUserLogin}
            className='border flex justify-self-center rounded-lg border-slate-500 p-3 w-80'
          />
          <div className='flex justify-center'>
            {error.userLogin && <span className="text-red-700 text-sm flex bg-red-200 rounded w-80 justify-center border-red-600 border-2">{error.userLogin}</span>}
          </div>
        </div>

        <div>
          <Inputs
            type='text'
            name='userPassword'
            placeholder='Senha'
            value={userPassword}
            onChange={handleUserPassword}
            className='border flex justify-self-center rounded-lg border-slate-500 p-3 w-80'
          />
          <div className='flex justify-center'>
            {error.userLogin && <span className="text-red-700 text-sm flex bg-red-200 rounded w-80 justify-center border-red-600 border-2">{error.userLogin}</span>}
          </div>
        </div>

        <div className="flex justify-self-center flex-col" style={{ transform: "scale(1.1)", transformOrigin: "0 0" }}>
          <ReCAPTCHA
            sitekey='6Lcz_doqAAAAAN4OzjYvrN3DOwFJvEbsJjRhQfqh'
            onChange={onChange}
          />
          {error.captchaError && (
            <div className="border-2 border-red-600 text-red-700 px-4 py-2 rounded relative mt-2 text-sm bg-red-200">
              <span className="block sm:inline">{error.captchaError}</span>
            </div>
          )}
        </div>

        <p className='p-3 text-sm mt-32 text-balance text-slate-700'>
          Utilize as credenciais recebidas para acessar a Página do Colaborador e preencher as informações necessárias para completar seu cadastro como funcionário.
        </p>

        <div className='flex justify-end m-8'>
          <button type='submit' >
            <div className='flex font-semibold text-lg p-4 rounded-3xl w-28 justify-center bg-sky-300'>
              Entrar
            </div>
          </button>
        </div>
        <div>
          {loginError && <span className="border-2 border-red-600 text-red-700 w-full justify-center flex px-4 py-2 rounded relative mt-2 text-sm bg-red-200">{loginError}</span>}
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
