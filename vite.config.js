import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      reporter: ['lcov', 'html', 'text', 'text-summary'],
    },
    css: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    globals: true,
    setupFiles: './src/setupTests.js'
  },
})
