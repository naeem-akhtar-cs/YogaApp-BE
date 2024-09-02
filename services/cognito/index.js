import cognitoItentityMethods from "./methods/index.js";

import dotenv from "dotenv";
dotenv.config("/.env");

const poolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};

class CognitoIdentityService {
  constructor() {
    this.poolData = poolData;
  }

  async signin(body, callback) {
    return await cognitoItentityMethods.login(this.poolData, body, callback);
  }

  signup(body, callback) {
    return cognitoItentityMethods.signup(this.poolData, body, callback);
  }

  async refreshSession(body, callback) {
    return await cognitoItentityMethods.refreshSession(this.poolData, body, callback);
  }

  async signout(authData, callback) {
    return await cognitoItentityMethods.signout(this.poolData, authData, callback);
  }
}

export default function Wrapper() {
  return new CognitoIdentityService();
}
