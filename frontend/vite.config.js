import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        bundle: 'src/main.tsx',
        styles: 'src/app.scss',
        index: 'index.html'
      },
    },
  },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin']
            }
        }),
        svgrPlugin({
            svgrOptions: {
                icon: true
            }
        })
    ]
});
