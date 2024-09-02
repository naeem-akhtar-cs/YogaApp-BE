import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey, { maxNetworkRetries: 2 });

const createSubscription = async (data) => {
  let customer = await stripe.customers.list({
    email: data.user.email,
    limit: 1,
  });

  let details = null;
  try {
    const customerId = customer.data[0].id;

    if (!customerId) {
      throw new Error("Could  not create customer");
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: data.items,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    details = {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    };
  } catch (error) {
    details = null;
  }
  return details;
};

export default createSubscription;
