import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CUSTOMER_TCP } from 'libs/constant/tcp/Customer/customer.tcp.constant';
import { CustomerLoginDto } from '../dtos/customer.login.dto';
import { CustomerService } from '../services/customer.service';
import { StrictRpcException } from 'libs/error/strict-rpc-class/micro-service-error';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: CUSTOMER_TCP.CUSTOMER_LOGIN })
  async login(incomingData: CustomerLoginDto) {
    try {
      console.log('Calling This Controller');
      const data = await this.customerService.login(incomingData);
      return data;
    } catch (error) {
      console.log('🚀 ~ CustomerController ~ login ~ error:', error);
      throw new StrictRpcException(error);
    }
  }
}
