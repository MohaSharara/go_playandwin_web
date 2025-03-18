import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

console.log("Configuration file loaded");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "goplayandwin.local.com",
    port: 3000,
    open: true, // Optional: automatically open the app in the browser
    hot: true,
    compress: true,
    liveReload: true,
    historyApiFallback: true,
  },
});