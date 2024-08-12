import { LocaleService, Plugin, UniverInstanceType, Inject, Injector, Dependency } from "@univerjs/core";

import { zhCN, enUS } from "./locale";
import { CustomMenuController } from "./controllers";

const SHEET_CUSTOM_MENU_PLUGIN = "SHEET_CUSTOM_MENU_PLUGIN";

export class UniverSheetsCustomMenuPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_SHEET;
  static override pluginName = SHEET_CUSTOM_MENU_PLUGIN;

  constructor(
    @Inject(Injector) protected readonly _injector: Injector,
    @Inject(LocaleService) private readonly _localeService: LocaleService
  ) {
    super();

    this._localeService.load({
      zhCN,
      enUS,
    });
  }

  override onStarting(): void {
    ([[CustomMenuController]] as Dependency[]).forEach((d) =>
      this._injector.add(d)
    );
  }
}