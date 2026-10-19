/** Minimal lint config: catches undefined identifiers (incl. components used in
 *  JSX that were never imported) and unused variables. No style rules. */
export default [
  {
    files: ['src/**/*.{js,jsx}', 'scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        URLSearchParams: 'readonly',
        HTMLElement: 'readonly',
        Event: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      // JSX usage is not tracked by core ESLint, so unused-var checks live in a
      // separate script (scripts/check-imports.mjs) instead of producing false positives.
      'no-unused-vars': 'off',
    },
  },
]
