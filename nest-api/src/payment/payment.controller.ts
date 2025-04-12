import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  
  /**
   * Получить доступные методы оплаты.
   * @returns Объект с массивом методов оплаты, где каждый метод включает id, имя и иконку.
   */
  @Get('methods')
  getPaymentMethods() {
    return {
      methods: [
        { id: 'card', name: 'Credit Card', icon: 'credit_card' },
        { id: 'paypal', name: 'PayPal', icon: 'paypal' },
        { id: 'crypto', name: 'Crypto', icon: 'currency_bitcoin' },
      ],
    };
  }

  /**
   * Обработать платеж.
   * В реальном приложении здесь должна быть интеграция с реальной платежной системой.
   * @param paymentData Данные о платеже, передаваемые в теле запроса.
   * @returns Демо-ответ с подтверждением успешности платежа, уникальным идентификатором заказа и временной меткой.
   */
  @Post('process')
  processPayment(@Body() paymentData: any) {
    // В реальном приложении здесь была бы интеграция с платежной системой
    console.log('Processing payment:', paymentData);

    // Демо-ответ
    return {
      success: true,
      orderId: 'DEMO-' + Math.random().toString(36).substring(2, 10),
      timestamp: new Date().toISOString(),
    };
  }

   /**
   * Получить HTML форму для выбранного метода оплаты.
   * @param data Данные, содержащие информацию о выбранном методе оплаты.
   * @returns HTML код формы для выбранного метода оплаты.
   */
  @Post('form')
  getPaymentForm(@Body() data: { method: string }) {
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
