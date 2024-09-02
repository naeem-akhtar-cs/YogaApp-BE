import protocol from "../../../models/protocol.js";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey, { maxNetworkRetries: 2 });

const getUserSubscriptions = async (data) => {
  try {
    const userId = data.user.id;

    let customer = await stripe.customers.list({
      email: data.user.email,
      limit: 1,
    });

    if (customer.data.length === 0) {
      console.log("No customer found for email:", data.user.email);
      return [];
    }

    let subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: 'active'  
    });
    let subscribedProtocols = [];
    if (subscriptions.data && subscriptions.data.length > 0) {
      subscriptions.data.forEach((subscription) => {
        try {
          subscription.items.data.forEach((item) => {
            if (item.plan.id) {
              subscribedProtocols.push(item.plan.id);
            }
          });
        } catch (error) {
          console.log("Error processing subscription:", error);
        }
      });
    }
    

    if (subscribedProtocols.length > 0) {
      const protocolsData = await protocol.find({
        stripePlanId: { $in: subscribedProtocols },
      }).select("_id name");  
      return protocolsData;
      
    } else {
      console.log("No active subscriptions found for user");
      return [];
    }
  } catch (error) {
    console.log("Error in getUserSubscriptions:", error);
    throw error; 
  }
  
};

export default getUserSubscriptions;