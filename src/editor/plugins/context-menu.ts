import type grapesjs from "grapesjs";
import { ContextMenuManager } from "../../modules";

export default (editor: grapesjs.Editor, opts?: Record<string, any>) => {
  const em = editor.getModel();

  em.tsLoadModule(ContextMenuManager);

  Object.defineProperty(editor, "ContextMenu", {
    get(): ContextMenuManager {
      return this.em.get("ContextMenu");
    },
    enumerable: false,
    configurable: true,
  });
};
