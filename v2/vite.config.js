import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/https://romanrios.github.io/MTESS-Form/v2/',
  plugins: [react()],
})
