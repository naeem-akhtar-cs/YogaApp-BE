import { CognitoJwtVerifier } from "aws-jwt-verify";
import { readFileSync } from "fs";
import user from "../models/user.js";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
});

const jwks = JSON.parse(readFileSync("middleware/jwks.json", { encoding: "utf-8" }));
verifier.cacheJwks(jwks);

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const userDetails = await verifier.verify(token); 
    const foundUser = await user.findOne({ cognitoUserId: userDetails.sub });

    if (!foundUser) {
      throw new Error("User not found");
    }

    req.query.userId = foundUser._id.toString();
    req.query.email = foundUser.email;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
