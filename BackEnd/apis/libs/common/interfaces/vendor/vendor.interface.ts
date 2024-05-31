export interface IVendorFullName {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

export interface IVendor {
  vendorName: IVendorFullName;
  email: string;
  contact: string;
}
