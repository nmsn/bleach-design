import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "es",
      dir: "dist",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript(), // tsconfig.json
    clear({
      targets: ["dist"],
    }),
    commonjs(),
    babel({
      extensions,
    }),
    // babel.config.json
    /** https://www.npmjs.com/package/@rollup/plugin-babel
     * When using @rollup/plugin-babel with @rollup/plugin-commonjs in the same Rollup configuration, it's important to note that @rollup/plugin-commonjs must be placed before this plugin in the plugins array for the two to work together properly. e.g.
     */
  ],
  external: ["react", "react-dom"],
};
