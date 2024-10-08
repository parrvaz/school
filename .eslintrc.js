module.exports = {
  root: true,
  // Use Next.js ESLint config as the base
  extends: [
    'next', // Includes Next.js specific rules
    'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
    'plugin:react/recommended', // React-specific linting rules
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    // Enforce Prettier rules
    'prettier/prettier': 'error',

    'no-unused-vars': 0, // Turn off the basic rule
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    'react-hooks/exhaustive-deps': 0,

    // Code quality rules
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console logs except for warnings and errors
    'no-debugger': 'error', // Disallow debugger statements

    // Best practices
    eqeqeq: ['error', 'always'], // Enforce strict equality
    'prefer-const': 'error', // Prefer const over let when variables are not reassigned
    'no-var': 'error', // Disallow var declarations, use let/const instead

    // Code style rules
    semi: ['error', 'always'], // Enforce semicolons
    'comma-dangle': ['error', 'always-multiline'], // Enforce consistent comma usage

    // Import rules
    'import/order': ['error', { groups: ['builtin', 'external', 'parent'] }],

    // Performance rules
    'no-duplicate-imports': 'error', // Prevent duplicate imports

    'react/react-in-jsx-scope': 0,

    // TypeScript rules
    '@typescript-eslint/explicit-function-return-type': 2, // Enforce explicit return types for functions
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
