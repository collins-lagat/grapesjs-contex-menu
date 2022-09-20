import { Model } from "backbone";

export class ContextMenu extends Model {
  defaults() {
    return {
      title: "",
      content: "",
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
