import type grapesjs from "grapesjs";
import { ContextMenuManager } from "../../modules";
import { cmdCustomOpenToolbar } from "../constants";

interface OpenToolbar {
  run(editor: ExtendedEditor, sender?: any, opts?: Record<string, any>): void;
  stop(editor: grapesjs.Editor, sender?: any, opts?: Record<string, any>): void;
  openToolbar(event?: OpenToolbarEvent): void;
  renderList(editor: ExtendedEditor): void;
  contextMenu?: ContextMenuManager;
  toolbar?: HTMLElement;
}

interface OpenToolbarEvent extends Event {
  clientX: number;
  clientY: number;
}

export const OpenToolbar: OpenToolbar = {
  openToolbar(event?: OpenToolbarEvent) {
    const { toolbar, contextMenu } = this;

    if (toolbar) {
      toolbar.style.display = "block";
    }

    if (event) {
      const { clientX, clientY } = event;
      contextMenu?.setPosition({
        x: clientX,
        y: clientY,
      });
    }

    if (toolbar) {
      contextMenu?.setContent(toolbar);
    }

    contextMenu?.open();
  },

  renderList(editor: ExtendedEditor) {
    const { toolbar } = this;
    const { em } = editor;
    const toolbarActions = editor.em
      .getSelected()
      .get("toolbar")
      .map((action: any) => {
        const button = document.createElement("button");
        const icon = document.createElement("span");
        if (!action.customLabel && /<svg/.test(action.label)) {
          if (action.label === em.getIcon("move")) {
            action.customLabel = "Move";
          }

          if (action.label === em.getIcon("copy")) {
            action.customLabel = "Duplicate";
          }

          if (action.label === em.getIcon("delete")) {
            action.customLabel = "Delete";
          }

          if (action.label === em.getIcon("arrowUp")) {
            action.customLabel = "Select Parent Element";
          }

          if (!action.customLabel) {
            action.customLabel = "Error: Unknown Option";
          }
        }

        if (action.customLabel) {
          icon.textContent = action.customLabel;
        } else {
          icon.textContent = action.label;
        }

        if (action.label === "Paste" && !em.get("clipboard")) {
          button.disabled = true;
        }

        button.classList.add(
          "list-group-item",
          "list-group-item-action",
          "d-flex",
          "align-items-center",
          "gap-2"
        );
        button.setAttribute("type", "button");
        button.appendChild(icon);
        button.addEventListener("click", (event) => {
          event.preventDefault();
          if (typeof action.command === "function") {
            this.contextMenu?.close();
            action.command(editor);
            return;
          }

          this.contextMenu?.close();
          editor.runCommand(action.command, {});
        });
        return button;
      });

    toolbarActions.forEach((action: any) => toolbar?.appendChild(action));
  },

  run(editor, _, opts?: { event: OpenToolbarEvent }) {
    if (!this.toolbar) {
      this.toolbar = document.createElement("div");
      this.contextMenu = editor.ContextMenu;

      this.renderList(editor);

      editor.on("context-menu:close", () => {
        editor.Commands.stop(cmdCustomOpenToolbar);
      });
    }

    this.openToolbar(opts?.event);
  },

  stop() {
    const { toolbar, contextMenu } = this;
    if (toolbar) {
      toolbar.style.display = "none";
    }
    contextMenu?.close();
  },
};

export default OpenToolbar;
