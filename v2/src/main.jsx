import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { App } from './App.jsx'
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
)
