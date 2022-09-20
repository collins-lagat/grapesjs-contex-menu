import contextMenu from "./plugins/context-menu";
import setup from "./plugins/setup";
import preset from "grapesjs-preset-webpage";
import blocks from "./plugins/blocks";

export const config: grapesjs.default.EditorConfig = {
  container: "#editor",
  plugins: [contextMenu, blocks, preset, setup],
};
