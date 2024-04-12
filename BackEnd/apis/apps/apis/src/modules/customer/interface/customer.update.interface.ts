import { CustomerUpdateDto } from '../dtos/customer.update.dto';

export class ICustomerUpdate {
  id: number;
  updateData: CustomerUpdateDto;
}
