import preset from "grapesjs-preset-webpage";
import contextMenu from "./plugins/context-menu";
import setup from "./plugins/setup";

export const config: grapesjs.default.EditorConfig = {
  container: "#editor",
  plugins: [contextMenu, preset, setup],
};
