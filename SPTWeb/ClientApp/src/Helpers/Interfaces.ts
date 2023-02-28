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
  itemID: number;
  name: string;
  weight: number;
  netWeight: number;
  productDesc: string;
  internalID: string;
  storeId: number;
}
export interface ICampaign {
  campaignId: number;
  itemId: number;
  startDate: Date;
  endDate: Date;
  wasPrice: number;
  isPrice: number;
  displayText: string;
  group: string;
  isActive: boolean;
}
export interface IFullItemDetails {
  item: IItem;
  images: Array<string>;
  campaigns: Array<ICampaign>;
  tag: string;
}
//#endregion
