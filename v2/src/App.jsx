import './css/App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Form } from './pages/Form';
import { LoginForm } from './pages/LoginForm';
import { RegisterForm } from './pages/RegisterForm';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { List } from './pages/List';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginForm title="INICIAR SESIÓN" targetRoute='/form' checkAdmin={false} />} />
          <Route path="/admin" element={<LoginForm title="ACCESO DE ADMINISTRADOR" targetRoute='/admin/list' checkAdmin />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
          <Route path="/admin/list" element={<List />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
