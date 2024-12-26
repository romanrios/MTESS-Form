import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
