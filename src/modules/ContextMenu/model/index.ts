import { Model } from "backbone";

export class ContextMenu extends Model {
  defaults() {
    return {
      content: "",
      position: { x: 0, y: 0 },
      attributes: {},
      open: false,
    };
  }

  open() {
    this.set("open", true);
  }

  close() {
    this.set("open", false);
  }
}
