import {
    Disposable,
    ICommandService,
    LifecycleStages,
    OnLifecycle,
    Inject,
    Injector
  } from "@univerjs/core";
  import { ComponentManager } from "@univerjs/ui";
  import type { IMenuItemFactory } from "@univerjs/ui";
  import { IMenuService } from "@univerjs/ui";
  
  import { CustomMenuItemImportFileFactory } from "./menu/import-file.menu";
  import { CustomMenuItemExportFileFactory } from "./menu/export-file.menu";
  import { UseImportFileCommand, UseExportFileCommand } from "../commands";
  import { FolderSingle, ExportSingle } from "@univerjs/icons";
  
  @OnLifecycle(LifecycleStages.Steady, CustomMenuController)
  export class CustomMenuController extends Disposable {
    constructor(
      @Inject(Injector) private readonly _injector: Injector,
      @ICommandService private readonly _commandService: ICommandService,
      @IMenuService private readonly _menuService: IMenuService,
      @Inject(ComponentManager)
      private readonly _componentManager: ComponentManager
    ) {
      super();
  
      this._initCommands();
      this._registerComponents();
      this._initMenus();
    }
  
    /**
     * register commands
     */
    private _initCommands(): void {
      [UseImportFileCommand, UseExportFileCommand].forEach((c) => {
        this.disposeWithMe(this._commandService.registerCommand(c));
      });
    }
  
    /**
     * register icon components
     */
    private _registerComponents(): void {
      const componentManager = this._componentManager;
      this.disposeWithMe(componentManager.register("FolderSingle", FolderSingle));
      this.disposeWithMe(componentManager.register("ExportSingle", ExportSingle));
      // this.disposeWithMe(componentManager.register("MainButtonIcon", MainButtonIcon));
      // this.disposeWithMe(componentManager.register("ItemIcon", ItemIcon));
    }
  
    /**
     * register menu items
     */
    private _initMenus(): void {
      ([CustomMenuItemImportFileFactory, CustomMenuItemExportFileFactory] as IMenuItemFactory[]).forEach(
        (factory) => {
          this.disposeWithMe(
            this._menuService.addMenuItem(this._injector.invoke(factory), {})
          );
        }
      );
    }
  }
  