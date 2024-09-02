import {
  CognitoUserPool,
  CognitoUser,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";

import user from "../../../models/user.js";

const refreshSession = async (poolData, data, callback) => {
  const RefreshToken = new CognitoRefreshToken({
    RefreshToken: data.refreshToken,
  });
  const userId = data.userId;
  let tokens = null;
  try {
    const userPool = new CognitoUserPool(poolData);
    const userInfo = await user
      .findOne({ _id: userId, isDeleted: false, isConfirmed: true })
      .select("email");

    const userData = {
      Username: userInfo.email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    try {
      tokens = await new Promise((resolve, reject) => {
        cognitoUser.refreshSession(RefreshToken, (err, session) => {
          if (err) reject(err);
          try {
            const tokens = {
              accessToken: session.getAccessToken().getJwtToken(),
              refreshToken: session.getRefreshToken().getToken(),
              idToken: session.getIdToken().getJwtToken()
            };
            resolve(tokens);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      tokens = null;
    }
  } catch (error) {
    tokens = null;
  }
  return tokens;
};

export default refreshSession;
