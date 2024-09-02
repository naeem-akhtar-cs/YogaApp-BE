import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import user from "../../../models/user.js"

const signin = (poolData, body, callback) => {
  const userPool = new CognitoUserPool(poolData);
  const { username, password } = body;
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async(res) => {
      /**
       * //TODO
       * Add isConfirmed check
       */
      const userInfo = await user.findOne({cognitoUserId: res.accessToken.payload.sub, isDeleted: false}).select("_id firstName lastName email");
      
      if(!userInfo){
        callback("Could not find user")
      }
      const data = {
        _id: userInfo._id,
        firstName: userInfo.firstName,
        email:userInfo.email,
        lastName: userInfo.lastName,
        refreshToken: res.getRefreshToken().getToken(),
        accessToken: res.getAccessToken().getJwtToken(),
      };
      console.log("data", data)
      callback(null, data);
    },
    onFailure: (err) => {
      console.log(err);
      
      callback(err);
    }
  });
};

export default signin;
