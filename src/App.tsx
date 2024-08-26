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
import { setConfig } from './common/api/token.tsx';
import { consoleClear } from './common/console-clear/console-clear.tsx';
import UserAdmin from './pages/UserAdmin.tsx';
import { screenshotBlocked, siteSecurity } from './common/privacy-features/privacy-features.tsx';
import ClientQuizStart from './pages/client/ClientQuizStart.tsx';
import AllUser from './pages/AllUser.tsx';
import ResultArchive from './pages/ResultArchive.tsx';
import ClientProfileEdit from './pages/client/ClientProfileEdit.tsx';
import Address from './pages/Address.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = localStorage.getItem('token');
  const role = localStorage.getItem('ROLE');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  useEffect(() => {
    screenshotBlocked();
    // siteSecurity();
  }, []);

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
      if (role === 'ROLE_TESTER') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/category');
      } else if (role === 'ROLE_CLIENT') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/client/dashboard');
      } else if (role === 'ROLE_SUPER_ADMIN') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/dashboard');
      } else if (role === 'ROLE_ADMIN') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/dashboard');
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

    // console clear u/n
    consoleClear();
  }, [pathname, tokens, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div id="screenshot-warning" className="hidden">
        Скрееншот олиш тақиқланган❗❌
      </div>

      <Routes>
        <Route
          index
          path={`/dashboard`}
          element={
            <>
              <PageTitle title="Admin | Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Admin | Category" />
              <Category />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <PageTitle title="Admin | Test" />
              <Test />
            </>
          }
        />
        <Route
          path="/all-user"
          element={
            <>
              <PageTitle title="Admin | All User" />
              <AllUser />
            </>
          }
        />
        <Route
          path="/address"
          element={
            <>
              <PageTitle title="Admin | Address" />
              <Address />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="Admin | User" />
              <User />
            </>
          }
        />
        <Route
          path="/archive/:id"
          element={
            <>
              <PageTitle title="Result Archive" />
              <ResultArchive />
            </>
          }
        />
        <Route
          path="/employees"
          element={
            <>
              <PageTitle title="Admin | Employees" />
              <UserAdmin />
            </>
          }
        />
        <Route
          path="/inspector-admin"
          element={
            <>
              <PageTitle title="Admin | Inspector" />
              <User />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/confirm"
          element={
            <>
              <PageTitle title="Confirm" />
              <ConfirmEmailCode />
            </>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset password" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/client/quiz/:id"
          element={
            <>
              <PageTitle title="Client | Quiz test" />
              <ClientQuizTest />
            </>
          }
        />
        <Route
          path="/client/quiz/result"
          element={
            <>
              <PageTitle title="Client | Quiz Result" />
              <ClientQuizResult />
            </>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <>
              <PageTitle title="Client | Dashboard" />
              <ClientDashboard />
            </>
          }
        />
        <Route
          path="/client/test/start"
          element={
            <>
              <PageTitle title="Client | Quiz" />
              <ClientQuizStart />
            </>
          }
        />
        <Route
          path="/client/profile"
          element={
            <>
              <PageTitle title="Client | Profile" />
              <ClientProfileEdit />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
