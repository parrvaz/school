module.exports = {
  root: true,
  // Use Next.js ESLint config as the base
  extends: [
    'next', // Includes Next.js specific rules
    'next/core-web-vitals', // Enforces Core Web Vitals best practices
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: ['prettier'],
  rules: {
    // Enforce Prettier rules
    'prettier/prettier': 'error',
    'no-console': 2,
    'no-unused-vars': 2,

    // React specific rules
    'react/react-in-jsx-scope': 'off', // Next.js automatically imports React
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript or modern React

    // Next.js specific rules
    '@next/next/no-img-element': 'off', // Allow using the standard <img> element (use Next.js <Image> for optimization)

    // Code quality rules
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console logs except for warnings and errors
    'no-unused-vars': 'warn', // Warn on unused variables
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
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
