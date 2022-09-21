import Backbone from "backbone";
import $ from "jquery";
import defaults from "./config";
import { ContextMenu } from "./model";
import ContextMenuView from "./view";
import "./assets/main.css";

Backbone.$ = $;

export interface IModule<TConfig extends any = any>
  extends IBaseModule<TConfig> {
  init(cfg: any): void;
  destroy(): void;
  postLoad(key: any): any;
  config: TConfig;
  onLoad?(): void;
  name: string;
  postRender?(view: any): void;
}

export interface IBaseModule<TConfig extends any> {
  em: any;
  config: TConfig;
}

export interface ModuleConfig {
  name?: string;
  stylePrefix?: string;
  appendTo?: string;
}

export class ContextMenuManager implements IModule<typeof defaults> {
  name: string;
  em: any;
  config: typeof defaults;
  model: ContextMenu;
  view?: ContextMenuView;

  constructor(em: any) {
    this.em = em;
    this.name = "ContextMenu";
    this.config = defaults;

    this.model = new ContextMenu(this);
    this.model.on("change:open", (m: ContextMenu, enable: boolean) => {
      em.trigger(`context-menu:${enable ? "open" : "close"}`);
    });

    this.em.on("block:drag", () => {
      this.close();
    });
    this.em.on("load", () => {
      this.em
        .get("Canvas")
        .getBody()
        .addEventListener("click", () => {
          this.close();
        });
    });
  }

  init(cfg: any): void {}

  postLoad(key: any) {}

  onLoad?(): void {}

  postRender(view: any): void {
    const el = view.model.getConfig().el || view.el;
    const res = this.render();
    if (res) {
      el?.appendChild(res);
    }
  }

  setContent(content: string | HTMLElement): ContextMenuManager {
    this.model.set("content", " ");
    this.model.set("content", content);
    return this;
  }

  setPosition(position: { x: number; y: number }): ContextMenuManager {
    this.model.set("position", position);
    return this;
  }

  open(opts: any = {}) {
    const attr = opts.attributes || {};
    opts.content && this.setContent(opts.content);
    this.model.set("attributes", attr);
    this.model.open();
    this.view?.updateAttr(attr);
    return this;
  }

  close() {
    this.model.close();
    return this;
  }

  render(): HTMLElement | undefined {
    const el = this.view?.el;
    this.view = new ContextMenuView({
      el,
      model: this.model,
    });
    return this.view?.render().el;
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
