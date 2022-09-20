import Backbone from "backbone";
import $ from "jquery";
import defaults from "./config";
import { ContextMenu } from "./model";
import ContextMenuView from "./view";

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
  config: {};
  model: ContextMenu;
  view?: ContextMenuView;

  constructor(em: any) {
    this.em = em;
    this.name = "ContextMenu";
    this.config = defaults;

    this.model = new ContextMenu(this);
  }

  init(cfg: any): void {}

  postLoad(key: any) {}

  onLoad?(): void {}

  postRender?(view: any): void {
    this.render();
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
