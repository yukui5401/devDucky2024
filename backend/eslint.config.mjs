import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { files: ["**.txt"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];