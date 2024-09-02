// import cognitoIdentity from "./../services/cognito/index.js";

// import userController from "./user.controller.js";
// import payment from "./../services/payment/index.js"

// const cognitoIdentityService = cognitoIdentity();
// const paymentService = payment();

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const cognitoParams = {
//     username: email,
//     password,
//   };

//   try {
//     const cognitoUser = await new Promise((resolve, reject) => {
//       cognitoIdentityService.signin(cognitoParams, (err, user) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(user);
//         }
//       });
//     });
//     res.status(200).send({ success: true, user: cognitoUser });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const signup = async (req, res) => {
//   const { firstName, lastName, username, email, password } = req.body;

//   const cognitoParams = {
//     firstName,
//     lastName,
//     username,
//     email,
//     password,
//   };

//   try {
//     const userDetails = await new Promise((resolve, reject) => {
//       cognitoIdentityService.signup(cognitoParams, (err, user) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(user);
//         }
//       });
//     });

//     userDetails.firstName = firstName;
//     userDetails.lastName = lastName;

//     userController.addNewUser(userDetails);
//     await paymentService.createCustomer({name: firstName + " " + lastName, email: email});
//     res.status(200).send({ success: true });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send({ success: false, message: "Could not signup" });
//   }
// };

// const refreshSession = async (req, res) => {
//   console.log("Request Body:", req.body);  // Log the incoming request body
//   const params = {
//     userId: req.body.userId,
//     refreshToken: req.body.refreshToken,
//   };

//   try {
//     const tokens = await cognitoIdentityService.refreshSession(params);
//     if (!tokens) {
//       throw new Error("Tokens not refreshed");
//     }
//     res.status(200).send({ success: true, tokens });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const signout = async (req, res) => {
//   const userId = req.query.userId;
//   const accessToken = req.header("Authorization");
//   const refreshToken = req.body.refreshToken;
//   const idToken = req.body.idToken;

//   const authData = {
//     userId, accessToken, refreshToken, idToken
//   }

//   try {
//     const cognitoUser = await new Promise((resolve, reject) => {
//       cognitoIdentityService.signout(authData, (err, user) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(user);
//         }
//       });
//     });
//     res.status(200).send({ success: true, user: cognitoUser });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };


// export default { login, signup, refreshSession, signout };
import cognitoIdentity from "./../services/cognito/index.js";

import userController from "./user.controller.js";
import payment from "./../services/payment/index.js"

const cognitoIdentityService = cognitoIdentity();
const paymentService = payment();

const login = async (req, res) => {
  const { email, password } = req.body;
  const cognitoParams = {
    username: email,
    password,
  };

  try {
    const cognitoUser = await new Promise((resolve, reject) => {
      cognitoIdentityService.signin(cognitoParams, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
    res.status(200).send({ success: true, user: cognitoUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const cognitoParams = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  try {
    const userDetails = await new Promise((resolve, reject) => {
      cognitoIdentityService.signup(cognitoParams, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    userController.addNewUser(userDetails);
    await paymentService.createCustomer({name: firstName + " " + lastName, email: email});
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false, message: "Could not signup" });
  }
};

const refreshSession = async (req, res) => {
  const params = {
    userId: req.body.userId,
    refreshToken: req.body.refreshToken,
  };

  try {
    const tokens = await cognitoIdentityService.refreshSession(params);
    if (!tokens) {
      throw new Error("Tokens not refreshed");
    }
    res.status(200).send({ success: true, tokens });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const signout = async (req, res) => {
  const userId = req.query.userId;
  const accessToken = req.header("Authorization");
  const refreshToken = req.body.refreshToken;
  const idToken = req.body.idToken;

  const authData = {
    userId, accessToken, refreshToken, idToken
  }

  try {
    const cognitoUser = await new Promise((resolve, reject) => {
      cognitoIdentityService.signout(authData, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
    res.status(200).send({ success: true, user: cognitoUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};


export default { login, signup, refreshSession, signout };