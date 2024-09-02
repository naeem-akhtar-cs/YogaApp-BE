import payment from "../services/payment/index.js";
import protocol from "../models/protocol.js";
import user from "../models/user.js";

const paymentService = payment();

const createSubscription = async (req, res) => {
  try {
    const userId = req.query.userId;

    const { protocols } = req.body;
    const protocolInfo = await protocol
      .find({ _id: { $in: protocols } })
      .select("stripePlanId");

    const itemslist = [];
    for (let i = 0; i < protocolInfo.length; i++) {
      itemslist.push({ plan: protocolInfo[i].stripePlanId, quantity: 1 });
    }
    const userData = await user.findById(userId).select("firstName lastName email");

    const data = {
      user: {
        email: userData.email,
        name: userData.firstName + " " + userData.lastName
      },
      items: itemslist
    };

    const response = await paymentService.createSubscription(data);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Could not process payment" });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    const { protocols } = req.body;
    const protocolInfo = await protocol
      .find({ _id: { $in: protocols } })
      .select("price");

    let amount = 0.0;
    for (let i = 0; i < protocolInfo.length; i++) {
      amount += parseFloat(protocolInfo[i].price) * 100;
    }

    if (!amount || amount <= 0) {
      throw new Error("Invalid Protocols");
    }

    const clientSecret = await paymentService.createPaymentIntent(amount);
    if (!clientSecret) {
      throw new Error("Could not generate client secret for payment");
    }
    res.send({ clientSecret });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Could not process payment" });
  }
};

export default { createSubscription, createPaymentIntent };
