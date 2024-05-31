import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CUSTOMER_TCP } from 'libs/common/constant/tcp/customer/customer.tcp.constant';
import { CustomerLoginDto } from '../../../../libs/common/dtos/customer/customer.login.dto';
import { CustomerService } from '../services/customer.service';
import { StrictRpcException } from 'libs/common/error/strict-rpc-class/micro-service-error';

//These are all user control
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: CUSTOMER_TCP.CUSTOMER_LOGIN })
  async login(incomingData: CustomerLoginDto) {
    try {
      const data = await this.customerService.login(incomingData);
      return data;
    } catch (error) {
      console.log('🚀 ~ CustomerController ~ login ~ error:', error);
      throw new StrictRpcException(error);
    }
  }
}
