import paymentMethods from "./methods/index.js";

class PaymentService {
  async createSubscription(data) {
    return await paymentMethods.createSubscription(data);
  }

  async createPaymentIntent(amount) {
    return await paymentMethods.createPaymentIntent(amount);
  }

  async createCustomer(user) {
    return await paymentMethods.createCustomer(user);
  }
}

export default function Wrapper() {
  return new PaymentService();
}
