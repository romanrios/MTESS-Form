import '../css/App.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { Form } from './Form';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>
        <LoginForm />
        <RegisterForm />
        <Form />
      </main>
      <Footer />
    </div>
  )
}

