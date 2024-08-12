import "./style.css";
import { FUniver } from "@univerjs-pro/facade";
import { LocaleType, Univer, UniverInstanceType, IConfigService, IWorkbookData } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import {
    EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY,
    EXCHANGE_IMPORT_SERVER_URL_KEY,
    EXCHANGE_EXPORT_SERVER_URL_KEY,
    EXCHANGE_GET_TASK_SERVER_URL_KEY,
    EXCHANGE_SIGN_URL_SERVER_URL_KEY,
    getUploadFile,
    downloadFile,
} from "@univerjs-pro/exchange-client";
import { UniverSheetsExchangeClientPlugin } from "@univerjs-pro/sheets-exchange-client";
import { UniverSheetsCustomMenuPlugin } from "./plugins";
import { zhCN, enUS } from 'univer:locales'
const initData = {
    "id": "gyI0JO",
    "sheetOrder": [
        "RSfWjJFv4opmE1JaiRj80"
    ],
    "name": "",
    "appVersion": "0.1.11",
    "locale": "zhCN",
    "styles": {},
    "sheets": {
        "RSfWjJFv4opmE1JaiRj80": {
            "id": "RSfWjJFv4opmE1JaiRj80",
            "name": "测试",
            "tabColor": "",
            "hidden": 0,
            "rowCount": 30,
            "columnCount": 10,
            "zoomRatio": 1,
            "freeze": {
                "startRow": -1,
                "startColumn": -1,
                "ySplit": 0,
                "xSplit": 0
            },
            "scrollTop": 0,
            "scrollLeft": 0,
            "defaultColumnWidth": 73,
            "defaultRowHeight": 23,
            "mergeData": [],
            "cellData": {},
            "rowData": {},
            "columnData": {
                "0": {
                    "w": 125,
                    "hd": 0
                },
                "1": {
                    "w": 125,
                    "hd": 0
                },
                "2": {
                    "w": 125,
                    "hd": 0
                },
                "3": {
                    "w": 125,
                    "hd": 0
                },
                "4": {
                    "w": 125,
                    "hd": 0
                },
                "5": {
                    "w": 125,
                    "hd": 0
                },
                "6": {
                    "w": 125,
                    "hd": 0
                },
                "7": {
                    "w": 125,
                    "hd": 0
                },
                "8": {
                    "w": 125,
                    "hd": 0
                },
                "9": {
                    "w": 125,
                    "hd": 0
                }
            },
            "showGridlines": 1,
            "rowHeader": {
                "width": 46,
                "hidden": 0
            },
            "columnHeader": {
                "height": 20,
                "hidden": 0
            },
            "selections": [
                "A1"
            ],
            "rightToLeft": 0
        }
    },
    "resources": [
        {
            "name": "SHEET_DEFINED_NAME_PLUGIN",
            "data": ""
        }
    ]
}
const init = (data = {}) => {
    const univer = new Univer({
        theme: defaultTheme,
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: zhCN,
            [LocaleType.EN_US]: enUS,
        },
    });
    // const EXCEL_API = ""
    // const injector = univer.__getInjector();
    // const configService = injector.get(IConfigService);
    // configService.setConfig(
    //   EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY,
    //   `${EXCEL_API}/universer-api/stream/file/upload`
    // );
    // configService.setConfig(
    //   EXCHANGE_IMPORT_SERVER_URL_KEY,
    //   `${EXCEL_API}/universer-api/exchange/{type}/import`
    // );
    // configService.setConfig(
    //   EXCHANGE_EXPORT_SERVER_URL_KEY,
    //   `${EXCEL_API}/universer-api/exchange/{type}/export`
    // );
    // configService.setConfig(
    //   EXCHANGE_GET_TASK_SERVER_URL_KEY,
    //   `${EXCEL_API}/universer-api/exchange/task/{taskID}`
    // );
    // configService.setConfig(
    //   EXCHANGE_SIGN_URL_SERVER_URL_KEY,
    //   `${EXCEL_API}/universer-api/file/{fileID}/sign-url`
    // );
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    
    univer.registerPlugin(UniverUIPlugin, {
        container: 'app',
    });
    
    univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);
    
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsExchangeClientPlugin);
    // custom menu plugin
    univer.registerPlugin(UniverSheetsCustomMenuPlugin);
    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);
    const univerAPI = FUniver.newAPI(univer);
    
    univerAPI.onCommandExecuted((command) => {
        if (command.id === "use.sheet.command.import.file") {
            (async() => {
                const uploadFile = await getUploadFile([], false);
                if(uploadFile) {
                    const xlsxToData = await univerAPI.importXLSXToSnapshot(uploadFile[0])
                    // init data
                    // univer.createUnit(UniverInstanceType.UNIVER_SHEET, xlsxToData as IWorkbookData)
                    init(xlsxToData)
                }
                
            })();
        }
        if (command.id === "use.sheet.command.export.file") {
            (async () => {
              const activeWorkbook = univerAPI.getActiveWorkbook();
              // const unitId = activeWorkbook.getId();
              // const activeSheet = activeWorkbook.getActiveSheet();
              const snapshot = activeWorkbook!.getSnapshot();
              console.log("snapshot", snapshot);
              // const unitIdToFile = await univerAPI.value.exportXLSXByUnitId(unitId);
              // console.log("unitIdToFile", unitIdToFile);
              const fileData = await univerAPI.exportXLSXBySnapshot(snapshot);
              console.log("fileData", fileData);
              if(fileData) downloadFile(fileData, "test", "xlsx");
            })();
          }
    })
}

init(initData);



