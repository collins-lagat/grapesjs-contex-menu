import { View } from "backbone";
import { ContextMenu } from "../model";
import _ from "lodash";

export default class ContextMenuView extends View<ContextMenu> {
  className = "gjs-context-menu";
  $title?: JQuery<HTMLElement>;
  $content?: JQuery<HTMLElement>;
  $collector?: JQuery<HTMLElement>;

  events() {
    return {
      click: "onClick",
      "click [data-close-modal]": "hide",
    };
  }

  constructor(opts: any) {
    super(opts);
    this.listenTo(this.model, "change:open", this.updateOpen);
    this.listenTo(this.model, "change:content", this.updateContent);
  }

  getContent() {
    if (!this.$content) {
      this.$content = this.$el.find(`.content`);
    }
    return this.$content;
  }

  updateOpen() {
    this.el.style.display = this.model.get("open") ? "" : "none";
  }

  updateContent() {
    const content = this.getContent();
    const body = this.model.get("content");
    content.empty().append(body);
  }

  updateAttr(attr?: any) {
    const { $el, el } = this;

    const currAttr = Array.from(el.attributes).map((i) => i.name);
    $el.removeAttr(currAttr.join(" "));
    $el.attr({
      ...(attr || {}),
      class: `${"ctx-"}container ${(attr && attr.class) || ""}`.trim(),
    });

    const position = this.model.get("position") as
      | { x: number; y: number }
      | undefined;

    if (position) {
      const { x, y } = position;
      this.$el.css({ top: y + 50, left: x + 30 });
    }
  }

  hide() {
    this.model.close();
  }

  template({ content }: any) {
    return `<div class="context-menu">
              <div class="content">${content}</div>
            </div>
            `;
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.updateOpen();

    return this;
  }
}
