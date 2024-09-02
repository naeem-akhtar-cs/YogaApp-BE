import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeSecretKey, { maxNetworkRetries: 2 });

const paymentIntent = async (amount) => {
  let clientSecret = null;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    clientSecret = paymentIntent.client_secret;
  } catch (error) {
    console.log(error);
    clientSecret = null;
  }
  return clientSecret;
};

export default paymentIntent;
