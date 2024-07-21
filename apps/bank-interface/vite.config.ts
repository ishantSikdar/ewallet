import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [react(), EnvCompatible()],
  define: {
    'process.env': process.env,
  },
  server: {
    port: Number(process.env.PORT)
  }
});