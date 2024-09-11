import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard.tsx';
import Category from './pages/Category.tsx';
import Test from './pages/Test.tsx';
import User from './pages/User.tsx';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ConfirmEmailCode from './pages/Authentication/ConfirmEmailCode.tsx';
import ClientQuizTest from './pages/client/ClientQuizTest.tsx';
import ClientDashboard from './pages/client/ClientDashboard.tsx';
import ResetPassword from './pages/Authentication/ResetPasword.tsx';
import ClientQuizResult from './pages/client/ClientQuizResult.tsx';
import UserAdmin from './pages/UserAdmin.tsx';
import Address from './pages/Address.tsx';
import ResultArchive from './pages/ResultArchive.tsx';
import ClientProfileEdit from './pages/client/ClientProfileEdit.tsx';
import ClientQuizStart from './pages/client/ClientQuizStart.tsx';
import AllUser from './pages/AllUser.tsx';
import PublicOffer from './pages/Authentication/PublicOffer.tsx';
import { consoleClear } from './common/console-clear/console-clear.tsx';
import { setConfig } from './common/api/token.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isCursorOutside, setIsCursorOutside] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = localStorage.getItem('token');
  const role = localStorage.getItem('ROLE');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  useEffect(() => {
    setConfig();
    const refresh = sessionStorage.getItem('refreshes');
    setTimeout(() => setLoading(false), 1000);

    if (!tokens) {
      sessionStorage.removeItem('refreshes');
      if (!pathname.startsWith('/auth')) navigate('/auth/signin');
    } else if (!refresh) sessionStorage.setItem('refreshes', 'true');
  }, [tokens, pathname, navigate]);

  useEffect(() => {
    setConfig();
    window.scrollTo(0, 0);

    if (pathname === '/') {
      if (role === 'ROLE_USER') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/client/dashboard');
      } else if (role === 'ROLE_STUDENT') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/client/dashboard');
      }
    }

    if (tokens && tokenExpiry) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiry)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('ROLE');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('ROLE');
    }

    if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/signin');
    if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');

    setTimeout(() => {
      consoleClear();
    }, 10000);
  }, [pathname, tokens, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div id="screenshot-warning" className="hidden">
        Скрееншот олиш тақиқланган❗❌
      </div>

      {(isCursorOutside && role === 'ROLE_CLIENT') && <div id="screenshot-warning">
        Сайтнинг хавфсизлик сиёсати туфайли сиз буердан чиқиб кетишингиз мумкин эмас. Сайтдан курсор фокуси узилиб
        қолди❗❌
      </div>}

      <Routes>
        <Route
          index
          path={`/dashboard`}
          element={
            <>
              <PageTitle title="Админ | Бошқарув панели" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Админ | Туркум" />
              <Category />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <PageTitle title="Админ | Тест" />
              <Test />
            </>
          }
        />
        <Route
          path="/all-user"
          element={
            <>
              <PageTitle title="Админ | Барча фойдаланувчи" />
              <AllUser />
            </>
          }
        />
        <Route
          path="/address"
          element={
            <>
              <PageTitle title="Админ | Манзил" />
              <Address />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="Админ | Фойдаланувчи" />
              <User />
            </>
          }
        />
        <Route
          path="/archive/:id"
          element={
            <>
              <PageTitle title="Натижа архиви" />
              <ResultArchive />
            </>
          }
        />
        <Route
          path="/employees"
          element={
            <>
              <PageTitle title="Админ | Ходимлар" />
              <UserAdmin />
            </>
          }
        />
        <Route
          path="/inspector-admin"
          element={
            <>
              <PageTitle title="Админ | Инспектор" />
              <User />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Тизимга кириш" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Рўйхатдан ўтиш" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/confirm"
          element={
            <>
              <PageTitle title="Тасдиқланг" />
              <ConfirmEmailCode />
            </>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Паролни тиклаш" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/auth/offer"
          element={
            <>
              <PageTitle title="Оферта шартлари" />
              <PublicOffer />
            </>
          }
        />
        <Route
          path="/client/quiz/:id"
          element={
            <>
              <PageTitle title="Мижоз | Викторина тести" />
              <ClientQuizTest />
            </>
          }
        />
        <Route
          path="/client/quiz/result"
          element={
            <>
              <PageTitle title="Мижоз | Викторина натижаси" />
              <ClientQuizResult />
            </>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <>
              <PageTitle title="Мижоз | Бошқарув панели" />
              <ClientDashboard />
            </>
          }
        />
        <Route
          path="/client/test/start"
          element={
            <>
              <PageTitle title="Мижоз | Викторина" />
              <ClientQuizStart />
            </>
          }
        />
        <Route
          path="/client/profile"
          element={
            <>
              <PageTitle title="Мижоз | Профил" />
              <ClientProfileEdit />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
