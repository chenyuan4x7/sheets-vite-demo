import { CommandType, ICommand, IAccessor } from "@univerjs/core";

export interface IUseImportFileCommandInterface {}
const UseImportFileCommand: ICommand = {
  id: "use.sheet.command.import.file",
  type: CommandType.COMMAND,
  handler: async (
    accessor: IAccessor,
    params?: IUseImportFileCommandInterface
  ) => {
    return true;
  },
};
export default UseImportFileCommand;
