import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  // Получение доступных способов оплаты
  @Get('methods')
  @ApiOperation({
    summary: 'Recived available payment methods',
    operationId: 'methods',
  })
  async getPaymentMethods() {
    await Promise.resolve();
    return {
      methods: [
        { id: 'card', name: 'Credit Card', icon: 'credit_card' },
        { id: 'paypal', name: 'PayPal', icon: 'paypal' },
        { id: 'crypto', name: 'Crypto', icon: 'currency_bitcoin' },
      ],
    };
  }

  // Обработка платежа
  @Post('process')
  @ApiOperation({
    summary: 'Proccessing paiment',
    operationId: 'process',
  })
  async processPayment(@Body() paymentData: any) {
    await Promise.resolve();
    // В реальном приложении здесь была бы интеграция с платежной системой
    console.log('Processing payment:', paymentData);

    // Демо-ответ
    return {
      success: true,
      orderId: 'DEMO-' + Math.random().toString(36).substring(2, 10),
      timestamp: new Date().toISOString(),
    };
  }

  // Получение HTML формы для оплаты (демо)
  @Post('form')
  @ApiOperation({
    summary: 'Recived paiment form',
    operationId: 'form',
  })
  @ApiBody({ type: PaymentMethodRequest })
  async getPaymentForm(@Body() data: { method: string }) {
    await Promise.resolve();
    let formHtml = '';

    switch (data.method) {
      case 'card':
        formHtml = `
          <div class="payment-form">
            <h3>Test Credit Card</h3>
            <div class="form-group">
              <label>Card Number</label>
              <input type="text" value="4242 4242 4242 4242" readonly class="demo-field">
            </div>
            <div class="form-group">
              <label>Expiry</label>
              <input type="text" value="12/25" readonly class="demo-field">
            </div>
            <div class="form-group">
              <label>CVC</label>
              <input type="text" value="123" readonly class="demo-field">
            </div>
            <button type="submit" class="submit-btn">Pay Now</button>
          </div>
        `;
        break;
      case 'paypal':
        formHtml = `
          <div class="payment-form">
            <h3>Test PayPal</h3>
            <p>Use demo account: test@example.com</p>
            <p>Password: test1234</p>
            <button type="submit" class="submit-btn">Login to PayPal</button>
          </div>
        `;
        break;
      default:
        formHtml = '<p>Payment method not supported in demo</p>';
    }

    return { form: formHtml };
  }
}

export class PaymentMethodRequest {
  method: string;
}
