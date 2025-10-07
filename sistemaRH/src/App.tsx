import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { UserProvider } from './contexts/UserContext'
import NotFound from './components/shared/NotFound'
import AccessDenied from './views/AccessDenied'
import Template from './views/Template'
import Login from './views/Login'
import Home from './views/Home'
import Test from './views/Test'
import Void from './views/Void'
import ProfileCreate from './views/profile/ProfileCrate'
import ProfileSearch from './views/profile/ProfileSearch'
import './App.css'
import UserForm from './views/user/UserForm'
import UserSearch from './views/user/UserSearch'
import VacancyTemplate from './views/VacancyTemplate'
import TemplateList from './views/HiringTemplateList'
import HiringRegister from './views/HiringRegister'
import ProcessValidation from './views/ProcessValidation'
import EditingProfile from './views/EditingProfile'
import EditiHiringRegister from './views/EditHiringRegister'
import NewPassword from './views/NewPassword'
import SendEmail from './views/SendEmail'
import OperationalBase from './views/OperationalBase'
import OperationalBaseCreate from './views/OperationalBaseCreate'
import ProcessVisualization from './views/ProcessVisualization'

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>

          <main className="flex-grow pt-16 bg-white minwidth dark:bg-gray-900 text-black dark:text-gray-200">
            <Routes>
              <Route path='/' element={<ProtectedRoute><Template /></ProtectedRoute>} >
                <Route path='home' element={<Home />} />
                <Route path='visualizacao-de-processo' element={<ProcessVisualization />} />
                <Route path='perfil-formulario' element={<ProfileCreate />} />
                <Route path='perfil-lista' element={<ProfileSearch />} />
                <Route path='usuario-formulario' element={<UserForm />} />
                <Route path='usuario-lista' element={<UserSearch />} />
                <Route path='editing-profile' element={<EditingProfile />} />
                <Route path='template-vaga' element={<VacancyTemplate />} />
                <Route path='lista-template' element={<TemplateList />} />
                <Route path='cadastro-contratacao' element={<HiringRegister />} />
                <Route path='validacao-do-processo' element={<ProcessValidation />} />
                <Route path='edicao-contratacao' element={<EditiHiringRegister />} />
                <Route path='criar-base-operacional' element={<OperationalBaseCreate />} />

              </Route>

              <Route path='test' element={<Test />} />
              <Route path='novaSenha' element={<SendEmail />} />
              <Route path='nova-senha' element={<NewPassword />} />
              <Route index path='login' element={<Login />} />
              <Route path='base-operacional' element={<OperationalBase />} />
              <Route path='accessDenied' element={<AccessDenied />} />
              <Route path='void' element={<Void />} />
              <Route path='*' element={<NotFound />} />

            </Routes>
          </main>

        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
