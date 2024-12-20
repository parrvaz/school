module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    boxShadow: {
      btn: '0px 1px 2px rgba(0, 0, 0, 0.12)',
      note: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
    colors: {
      black05: '#f8fafc',
      black10: '#f1f5f9',
      black20: '#e2e8f0',
      black30: '#cbd5e1',
      black40: '#94a3b8',
      black50: '#64748b',
      black60: '#475569',
      black70: '#334155',
      black80: '#1e293b',
      black90: '#0f172a',

      berry05: '#eef2ff',
      berry10: '#e0e7ff',
      berry20: '#c7d2fe',
      berry30: '#a5b4fc',
      berry40: '#818cf8',
      berry50: '#6366f1',
      berry60: '#4f46e5',
      berry70: '#4338ca',
      berry80: '#3730a3',
      berry90: '#312e81',
      berry100: '#2C2871',

      blue10: '#dbeafe',
      blue20: '#bfdbfe',
      blue30: '#93c5fd',
      blue40: '#60a5fa',
      blue50: '#3b82f6',
      blue60: '#2563eb',
      blue70: '#1d4ed8',
      blue80: '#1e40af',
      blue90: '#1e3a8a',

      green05: '#E2F3F3',
      green10: '#A9DBDB',
      green20: '#8CCFCF',
      green30: '#61BDBD',
      green40: '#48ADAD',
      green50: '#429E9E',
      green60: '#3C9090',
      green70: '#307373',
      green80: '#2A6565',
      green90: '#1E4848',

      sun10: '#fef3c7',
      sun20: '#fde68a',
      sun30: '#fcd34d',
      sun40: '#fbbf24',
      sun50: '#f59e0b',
      sun60: '#d97706',
      sun70: '#b45309',
      sun80: '#92400e',
      sun90: '#78350f',

      red10: '#fee2e2',
      red20: '#fecaca',
      red30: '#fca5a5',
      red40: '#f87171',
      red50: '#ef4444',
      red60: '#dc2626',
      red70: '#b91c1c',
      red80: '#991b1b',
      red90: '#7f1d1d',

      chart1: '#2962FF',
      chart2: '#FF6D00',
      chart3: '#AA00FF',
      chart4: '#F23645',
      chart5: '#4CAF50',
      chart6: '#FFEB3B',
      chart7: '#FF4081',
      chart8: '#089981',
      chart9: '#9C27B0',
      chart10: '#673AB7',

      white: '#fff',
      white10: 'rgba(255, 255, 255, 0.1)',
      white50: 'rgba(255, 255, 255, 0.50)',
      white70: 'rgba(255, 255, 255, 0.70)',
      white90: 'rgba(255, 255, 255, 0.90)',
      black: '#000',
      black11: 'rgba(0, 0, 0, 0.11)',
      transparent: 'transparent',
      other1: '#00D95F',
      other2: '#FB67CA',
    },
    fontSize: {
      8: ['.5rem', '.5rem'],
      10: ['.625rem', '.875rem'],
      11: ['.6875rem', '.925rem'],
      12: ['.75rem', '1.5rem'],
      13: ['.8125rem', '1.125rem'],
      14: ['.875rem', '1.25rem'],
      16: ['1rem', '1.5rem'],
      18: ['1.125rem', '1.75rem'],
      20: ['1.25rem', '1.75rem'],
      24: ['1.5rem', '2rem'],
      28: ['1.875rem', '2.25rem'],
      32: ['2rem', '2.25rem'],
      36: ['2.25rem', '2.5rem'],
      40: ['2.5rem', '3rem'],
      48: ['3rem', 1],
    },
    screens: { md: '768px', xl: '1200px' },
    fontWeight: { thin: '100' },
    fontFamily: {
      light: ['IRANSans_Light'], // 300
      regular: ['IRANSans_Regular'], // 400
      medium: ['IRANSans_Medium'], // 500
      semibold: ['IRANSans_SemiBold'], // 600
      bold: ['IRANSans_Bold'], // 700
    },
    flexGrow: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  },
  plugins: [require('daisyui')],
};
