import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remixDevTools } from 'remix-development-tools';
import { resolve } from 'path';

declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    port: 3000,
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*'],
    },
  },
  ssr: {
    noExternal: ['@medusajs/js-sdk'],
  },
  plugins: [
    remixDevTools(),
    remix({
      future: {
        v3_singleFetch: true,
        unstable_optimizeDeps: true,
      },
    }),
    tsconfigPaths({ root: './' }),
    vanillaExtractPlugin(),
  ],
  build: {},
  resolve: {
    alias: {
      '@app': resolve(__dirname, './app'),
      '@libs': resolve(__dirname, './libs')
    }
  }
});
