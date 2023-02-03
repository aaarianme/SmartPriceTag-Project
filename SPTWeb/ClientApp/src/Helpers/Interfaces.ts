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
  clientId: string | number;
  name: string;
  userName: string;
  pass: string;
}
export interface IItem {
  clientId: string | number;
  name: string;
  userName: string;
  pass: string;
}
//#endregion
