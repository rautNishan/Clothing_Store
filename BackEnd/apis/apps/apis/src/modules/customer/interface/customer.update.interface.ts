import { CustomerUpdateDto } from 'libs/common/dtos/customer/customer.update.dto';

//Only make interface that is needed in apis
export class ICustomerUpdate {
  id: number;
  updateData: CustomerUpdateDto;
}
