import Stripe from "stripe";
import protocol from "../../../models/protocol.js";
import user from "../../../models/user.js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey, { maxNetworkRetries: 2 });

const unsubscribeFromProtocol = async (data) => {
  try {
    const { userId, protocolId } = data;

    console.log(`Unsubscribe request: { userId: ${userId}, protocolId: ${protocolId} }`);

    if (!userId || !protocolId) {
      return { success: false, error: "Missing userId or protocolId" };
    }

   
    const protocolData = await protocol.findById(protocolId);
    if (!protocolData) {
      return { success: false, error: "Protocol not found" };
    }

    console.log('Fetched protocol:', protocolData);

   
    const userData = await user.findById(userId);
    if (!userData) {
      return { success: false, error: "User not found" };
    }

    console.log('Fetched user:', userData);

    const customer = await stripe.customers.list({
      email: userData.email,
      limit: 1,
    });

    if (customer.data.length === 0) {
      return { success: false, error: "No Stripe customer found for this user" };
    }

    
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      plan: protocolData.stripePlanId,
    });

    if (subscriptions.data.length === 0) {
      return { success: false, error: "No active subscription found for this protocol" };
    }

    const subscriptionId = subscriptions.data[0].id;
    console.log(`Cancelling subscription with ID: ${subscriptionId}`);
    
    const cancelResult = await stripe.subscriptions.cancel(subscriptionId);
    console.log('Subscription cancellation result:', cancelResult);

    return { success: true };
  } catch (error) {
    console.log('Error in unsubscribeFromProtocol:', error);
    return { success: false, error: error.message };
  }
};

export default unsubscribeFromProtocol;