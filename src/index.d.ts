interface ExtendedEditor extends grapesjs.default.Editor {
  getModel(): Backbone.Model;
  ContextMenu: any;
  on(event: GrapesEvent, callback: (...params: any[]) => any): Editor;
}

type ExtendedGrapesEvent = grapesjs.default.GrapesEvent | ContextMenuEvents;

type ContextMenuEvents = "context-menu:open" | "context-menu:close";
