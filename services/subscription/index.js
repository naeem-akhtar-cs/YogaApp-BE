
import subscriptionMethods from "./methods/index.js";

class SubscriptionService {
  async getUserSubscriptions(data) {
    return await subscriptionMethods.getUserSubscriptions(data);
  }

  async unsubscribeFromProtocol(data) {
    return await subscriptionMethods.unsubscribeFromProtocol(data);
  }
}

export default function Wrapper() {
  return new SubscriptionService();
}