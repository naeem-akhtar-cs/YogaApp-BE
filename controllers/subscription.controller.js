import subscription from "../services/subscription/index.js";

const subscriptionService = subscription();

const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userEmail = req.query.email;

    console.log("Incoming query parameters:", { userId, userEmail });

    const data = { user: { id: userId, email: userEmail } };

    console.log("Data object sent to subscription service:", data);

    const subscriptions = await subscriptionService.getUserSubscriptions(data);

    console.log("Subscriptions received from service:", subscriptions);
    
    if (Array.isArray(subscriptions)) {
      subscriptions.forEach(subscription => {
        console.log(`Subscription ID: ${subscription._id}, Protocol Name: ${subscription.name}`);
      });
    } else {
      console.log("No subscriptions found or an error occurred");
    }

    res.status(200).send(subscriptions || []);
  } catch (error) {
    console.log("Error in getUserSubscriptions:", error);
    res.status(500).send({ message: "Could not get user subscription", error: error.message });
  }
};
const unsubscribeFromProtocol = async (req, res) => {
  try {
    const { userId, protocolId } = req.query;

    console.log(`Unsubscribe controller - Request data: { userId: ${userId}, protocolId: ${protocolId} }`);

    if (!userId || !protocolId) {
      throw new Error("Missing userId or protocolId");
    }

    const data = { userId, protocolId };

    
    const result = await subscriptionService.unsubscribeFromProtocol(data);

    console.log("Unsubscribe result:", result);

    if (result === undefined) {
      throw new Error("Subscription service returned undefined");
    }

    if (result.success) {
      res.status(200).send({ message: "Successfully unsubscribed from protocol" });
    } else {
      res.status(400).send({ message: result.error || "Failed to unsubscribe from protocol" });
    }
  } catch (error) {
    console.error("Error in unsubscribeFromProtocol:", error);
    res.status(500).send({ message: "Could not unsubscribe from protocol", error: error.message });
  }
};

export default { getUserSubscriptions, unsubscribeFromProtocol };