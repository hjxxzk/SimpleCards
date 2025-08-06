import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            enabled: true,
            include: ["src"],
            exclude: [
                "src/**/*.types.ts",
                "src/**/*.{spec,test,mock}.ts",
                "src/main.tsx",
                "src/vite-env.d.ts",
                "src/App.tsx",
            ]

        }
    },
});
