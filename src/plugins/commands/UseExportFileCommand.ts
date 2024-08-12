import { CommandType, ICommand, IAccessor } from "@univerjs/core";

export interface IUseExportFileCommandInterface {}
const UseExportFileCommand: ICommand = {
  id: "use.sheet.command.export.file",
  type: CommandType.COMMAND,
  handler: async (
    accessor: IAccessor,
    params?: IUseExportFileCommandInterface
  ) => {
    return true;
  },
};
export default UseExportFileCommand;
