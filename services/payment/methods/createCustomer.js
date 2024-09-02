import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey, { maxNetworkRetries: 2 });

const createCustomer = async (user) => {
  let customer = null;
  try {
    customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    /**
     * Even though new stripe customer was not created but it should signup successfully, we will create it again during subscription
     */
    console.log(error);
  }
};

export default createCustomer;
