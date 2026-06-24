import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/aieg-lead-research-workbench/',
  plugins: [react()],
});
