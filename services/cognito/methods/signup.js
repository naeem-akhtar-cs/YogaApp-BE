import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const attributes = (key, value) => ({
  Name: key,
  Value: value,
});

const signup = (poolData, body, callback) => {
  const userPool = new CognitoUserPool(poolData);

  const { firstName, lastName, username, email, password } = body;
  const attributesList = [
    attributes("email", email),
    attributes("given_name", firstName),
    attributes("family_name", lastName),
  ];

  const cognitoAttributeList = attributesList.map((element) => new CognitoUserAttribute(element));

  userPool.signUp(
    username,
    password,
    cognitoAttributeList,
    null,
    (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      const data = {
        userId: res.userSub,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userConfirmed: res.userConfirmed,
      };
      callback(null, data);
    }
  );
};

export default signup;
