export interface ICustomerFullName {
  firstName: string;
  middleName?: string;
  lastName?: string;
}
export interface ICustomer {
  customerName: ICustomerFullName;
  email: string;
  contact: string;
}
