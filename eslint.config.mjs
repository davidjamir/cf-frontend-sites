import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      ".next/**",
      ".vinext/**",
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "worker-configuration.d.ts",
    ],
  },
);
