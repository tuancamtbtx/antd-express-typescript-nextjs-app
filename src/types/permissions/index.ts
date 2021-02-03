export interface IPermission {
  key: string;
  name: string;
  status: "Active" | "InActive";
  type: 'APP' | 'API',
  createdBy?: string;
  createdTime?: string;
}
