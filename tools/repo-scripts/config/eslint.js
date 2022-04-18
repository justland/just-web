module.exports = {
  jsx(project) {
    return {
      env: {
        es6: true,
        jest: true
      },
      extends: [
        'react-app',
        'react-app/jest',
        'plugin:harmony/latest',
        'plugin:yml/standard',
      ],
      overrides: [
        {
          extends: [
            'plugin:harmony/ts-recommended-type-check'
          ],
          files: [
            '*.ts',
            '*.tsx'
          ],
          parserOptions: {
            project,
            EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
          },
          rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/require-await': 'off',
          }
        },
        {
          extends: [
            'plugin:storybook/recommended'
          ],
          files: [
            '**/*.stories.*'
          ],
          rules: {
            // `userEvent.click(): void` but it is actually returning a promise
            // https://github.com/storybookjs/eslint-plugin-storybook/issues/45
            // https://github.com/storybookjs/testing-library/issues/10
            '@typescript-eslint/await-thenable': 'off',
            'import/no-anonymous-default-export': 'off'
          }
        },
        {
          files: [
            '**/*.spec.*'
          ],
          rules: {
            // mostly for snapshot testing
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
          }
        }
      ],
      root: true
    }
  },
  library(project) {
    return {
      env: {
        node: true,
        es6: true,
        jest: true
      },
      extends: [
        'plugin:harmony/latest',
        'plugin:yml/standard'
      ],
      overrides: [
        {
          extends: [
            'plugin:harmony/ts-recommended-type-check'
          ],
          files: [
            '*.ts',
            '*.tsx'
          ],
          parserOptions: {
            project,
            EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
          },
          rules: {
            '@typescript-eslint/require-await': 'off'
          }
        }
      ],
      root: true
    }
  }
}
