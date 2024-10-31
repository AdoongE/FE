module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended", // prettier 추가
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    indent: "off",
    "no-undef": "error", // 정의 안 한 변수 사용 x
    "no-trailing-spaces": "error", // 쓸데없는 공백 지우기
    // "import/newline-after-import": ["error", { count: 1 }], // import 구문들 뒤에 한 칸 띄우고 코드 작성
    "no-multi-spaces": "error", // 스페이스 여러개 금지
    "no-duplicate-imports": "error", // 중복 Import 금지
  },
  settings: {
    react: { version: "detect" },
  },
};
