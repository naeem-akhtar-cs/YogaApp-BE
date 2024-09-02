import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

import user from "../../../models/user.js";

const signout = async (poolData, authData, callback) => {
  const userPool = new CognitoUserPool(poolData);
  const userInfo = await user
    .findOne({ _id: authData.userId, isDeleted: false, isConfirmed: true })
    .select("email");

  const userData = {
    Username: userInfo.email,
    Pool: userPool,
    // AccessToken: accessToken,
  };

  // var cognitoUser1 = await userPool.getCurrentUser();

  try {
    const cognitoUser = new CognitoUser(userData);

    // cognitoUser.setSignInUserSession(
    //   new CognitoUserSession({
    //     AccessToken: authData.accessToken,
    //     IdToken: authData.idToken,
    //     RefreshToken: authData.refreshToken,
    //   })
    // );

    // const response = await cognitoUser.globalSignOut({
    //   onSussess: (res) => {
    //     console.log(res);
    //     callback(null, res);
    //   },
    //   onFailure: (error) => {
    //     callback(error);
    //   },
    // });

    // cognitoUser.getSession(async (err, session) => {
    //   if (err) {
    //     console.error("Error getting session:", err);
    //     return;
    //   }
    //   const response = await cognitoUser.globalSignOut({
    //     onSussess: (res) => {
    //       console.log(res);
    //       callback(null, res);
    //     },
    //     onFailure: (error) => {
    //       callback(error);
    //     },
    //   });
    // });

    // const cognitoUser = userPool.getCurrentUser();

    // cognitoUser.authenticateUser(authDetails, {
    //   onSuccess: async () => {
    //     console.log("User authenticated");
    //     const response = await cognitoUser.globalSignOut({
    //       onSussess: (res) => {
    //         console.log(res);
    //         callback(null, res);
    //       },
    //       onFailure: (error) => {
    //         callback(error);
    //       },
    //     });
    //   },
    //   onFailure: (error) => {
    //     console.log("An error happened");
    //   },
    // });

    // console.log(response);
    const response = await cognitoUser.signOut()
    callback(null, response);
  } catch (error) {
    callback(error);
  }

  // cognitoUser.signOut({
  //   onSuccess: async (res) => {
  //     const data = res;
  //     console.log(data);
  //     callback(null, data);
  //   },
  //   onFailure: (error) => {
  //     callback(error);
  //   },
  // });
};

export default signout;
