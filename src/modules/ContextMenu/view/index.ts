import { View } from "backbone";
import { ContextMenu } from "../model";

export default class ContextMenuView extends View<ContextMenu> {
  events() {
    return {
      click: "onClick",
    };
  }
}
