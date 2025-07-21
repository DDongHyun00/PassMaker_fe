// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
//
// export default defineConfig({
//   server: {
//     port: 5173,
//     strictPort: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // Node 전역 객체 alias 설정
//       global: 'globalThis',
//       buffer: 'buffer',
//       process: 'process/browser',
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis',
//         'process.env': {},
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//           process: true,
//         }),
//       ],
//     },
//   },
//   build: {
//     rollupOptions: {
//       plugins: [
//         rollupNodePolyFill(),
//       ],
//     },
//   },
// });

// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  server:{
    port:5173,
    strictPort: true,
    proxy: {
      // 프론트에서 /api로 시작하는 요청은 백엔드로 프록시
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Node 전역 객체 alias 설정
      global: 'globalThis',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // Rollup에서도 polyfill 적용
      ],
    },
  },
});
