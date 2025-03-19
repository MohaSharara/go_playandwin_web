import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import * as process from 'node:process';

export default defineConfig(({ command, mode }) => {
    // Load the correct .env file based on the mode (development, production, local)
    const env = loadEnv(mode, process.cwd(), '');

    console.log(`Base URL: ${env.VITE_BASE_URL}`);
    console.log(`Mode is : ${mode}`);

    return {
        plugins: [react()],
        server: {
            host: 'goplayandwin.local.com',
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            liveReload: true,
            historyApiFallback: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
            'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
            'import.meta.env.VITE_SECRET_KEY': JSON.stringify(env.VITE_SECRET_KEY),
        },
        build: {
            target: 'esnext', // To allow top-level await
            rollupOptions: {
                external: ['jquery', 'bootstrap', 'fingerprint2', 'Winwheel', 'TweenMax'], // Avoid bundling these scripts
            },
        },
    };
});
