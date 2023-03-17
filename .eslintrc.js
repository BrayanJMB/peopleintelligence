module.exports = {
  'extends': ['react-app'],
    plugins: [
      'simple-import-sort',
    ],
    'rules': {
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    'overrides': [
      {
        'files': ['**/*.ts?(x)'],
        'rules': {
          'additional-typescript-only-rule': 'warn',
        },
      },
      {
        'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
        'rules': {
          'simple-import-sort/imports': [
            'error',
            {
              'groups': [
                // Packages `react` related packages come first.
                ['^react', '^@?\\w'],
                // Internal packages.
                ['^(@|components)(/.*|$)'],
                // Side effect imports.
                ['^\\u0000'],
                // Parent imports. Put `..` last.
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports. Put same-folder imports and `.` last.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports.
                ['^.+\\.?(css)$'],
              ],
            },
          ],
        },
      },
    ],
};