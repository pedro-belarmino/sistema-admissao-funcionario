import ProtectedRoute from './components/shared/ProtectedRoute';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './views/Home';
import './index.css';

import Template from './views/Template';
import Login from './views/Login';
import AccessDenied from './views/AccessDenied';
import { PersoalIdentification } from './components/pages/CollaboratorForm/PersonalIdentification';
import DocumentationAndIdentity from './components/pages/CollaboratorForm/DocumentationAndIdentity';
import AddressInformation from './components/pages/CollaboratorForm/AddressInformation';
import DocumentationAndIdentityInForeignCases from './components/pages/CollaboratorForm/DocumentationAndIdentityInForeignCases';
import ContactInformation from './components/pages/CollaboratorForm/ContactInformation';
import WorkingStatusAndSpecialConditions from './components/pages/CollaboratorForm/WorkingStatusAndSpecialConditions';
import SendingDocuments from './components/pages/CollaboratorForm/SendingDocuments/SendingDocuments';
import Success from './views/Success';
import NotFound from './views/NotFound';
import Test from './views/Test';

const App: React.FC = () => {

  return (
    <UserProvider>
      <BrowserRouter>

        <main className="mainScreen- flex-grow flex h-screen w-full bg-white dark:bg-gray-900 content-center justify-center self-center text-black dark:text-gray-200">
          <Routes>
            <Route path='/' element={<ProtectedRoute><Template /></ProtectedRoute>} >
              <Route path='home' element={<Home />} />
              <Route path='identificacao-pessoal' element={<PersoalIdentification />} />
              <Route path='documentacao-e-identidade' element={<DocumentationAndIdentity />} />
              <Route path='informacaoes-de-endereco' element={<AddressInformation />} />
              <Route path='documentacao-e-identidade-em-caso-de-estrangeiro' element={<DocumentationAndIdentityInForeignCases />} />
              <Route path='informacoes-de-contato' element={<ContactInformation />} />
              <Route path='situacoes-de-trabalho-e-condicoes-especiais' element={<WorkingStatusAndSpecialConditions />} />
              <Route path='envio-de-documentos' element={<SendingDocuments />} />
            </Route>

            <Route path='feche-esta-aba' element={<Success />} />
            <Route path='accessDenied' element={<AccessDenied />} />
            <Route path='login' element={<Login />} />
            <Route path='' element={<Login />} />
            <Route path='test' element={<Test />} />
            <Route path='*' element={<NotFound />} />

          </Routes>
        </main>

      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
