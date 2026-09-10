import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'node_modules', 'coverage'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactHooks.configs['recommended-latest'],
      jsxA11y.flatConfigs.strict,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Clean code: nomes explícitos, sem `any`, sem imports mortos.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // O motor depende de switches exaustivos sobre o tipo do nó.
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // CSS Modules e dados vindos do disco chegam como assinatura de índice.
      // Acessá-los por colchetes é o que torna explícito que a chave pode não
      // existir — a regra continua valendo para propriedades declaradas.
      '@typescript-eslint/dot-notation': ['error', { allowIndexSignaturePropertyAccess: true }],

      // Desligada de propósito: `role="list"` é redundante na especificação,
      // mas o Safari/VoiceOver remove a semântica de lista quando
      // `list-style: none` está aplicado — e está, em quase todas as nossas.
      // Manter o papel explícito é acessibilidade real, não ruído.
      'jsx-a11y/no-redundant-roles': 'off',

      // Limites de complexidade — legibilidade e manutenção são critérios de nota.
      complexity: ['warn', 12],
      'max-depth': ['warn', 3],
      // 120 e não 80: um componente com JSX gasta linhas em marcação, que não
      // é complexidade. As exceções reais levam desativação local justificada.
      'max-lines-per-function': ['warn', { max: 120, skipBlankLines: true, skipComments: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    // Conteúdo do roteiro: arquivos de dados longos por natureza.
    files: ['src/content/**/*.ts'],
    rules: { 'max-lines-per-function': 'off' },
  },
);
