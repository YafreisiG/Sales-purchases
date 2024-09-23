import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: false, // Asegúrate de que HTTPS esté desactivado
  }, // Asegúrate de que sea este puerto
  
})

