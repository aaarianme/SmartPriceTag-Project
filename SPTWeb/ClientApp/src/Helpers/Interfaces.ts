//#region Classes
export interface IStore {
  name: string;
  address: string;
  createdOn: Date;
  branchNumber: number;
  isActive: boolean;
  pin: string;
}
export interface IClient {
  name: string;
  userName: string;
  pass: string;
}
//#endregion
