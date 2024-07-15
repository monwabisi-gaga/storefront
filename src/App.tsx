// src/App.tsx
import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import ErrorResult from './components/ErrorResult';
import { useTranslation } from 'react-i18next';
import './i18n';

const Home = lazy(() => import('./pages/Home'));
const UserRegistration = lazy(() => import('./pages/UserRegistration'));
const Login = lazy(() => import('./pages/UserLogin'));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <ErrorResult
                title="404"
                subTitle={t('pageNotFound')}
                status="404"
              />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
