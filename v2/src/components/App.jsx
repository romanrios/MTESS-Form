import '../css/App.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { Form } from './Form';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Routes, Route, Link } from 'react-router-dom';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>

        <nav>
          <ul>
            <li><Link to="/">Iniciar sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to="/form">Formulario Principal</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/form" element={<Form />} />
        </Routes>

      </main >
      <Footer />
    </div >
  )
}

