/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['setupTest.ts'],
        include: ['tests/**/*.{test,spec}.{ts,tsx}'],
        exclude: [...configDefaults.exclude, '**/e2e/**', '**/tests-examples/**'],
    },
    resolve: {
        alias: [
            {
                find: '@tests',
                replacement: '/tests',
            },
            {
                find: '@',
                replacement: '/src',
            },
        ]
    },
})
