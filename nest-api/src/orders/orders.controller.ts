import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateOrderRequest, UpdateOrderRequest } from './models';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  private orders = []; // Временное хранилище, пока нет базы данных

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all orders'
  })
  async getOrders() {
    return { orders: this.orders };
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order found'
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(@Param('orderId') orderId: string) {
    
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiBody({ type: CreateOrderRequest })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created'
  })
  async createOrder(@Body() createOrderDto: CreateOrderRequest) {
    
  }

  @Put(':orderId')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderRequest })
  @ApiResponse({ 
    status: 200, 
    description: 'Order updated',    
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderRequest
  ) {
    
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order deleted',    
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async deleteOrder(@Param('orderId') orderId: string) {    
    return { message: 'Order deleted successfully' };
  }
}