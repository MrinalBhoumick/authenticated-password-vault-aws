import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js";

  const poolData = {
    UserPoolId: "ap-south-1_FilUycQEP",
    ClientId: "2j3i0nd49opjnoaut6s46r5m7e",
  };

  export const userPool = new CognitoUserPool(poolData);

  export const signUp = (email, password) =>
    new Promise((resolve, reject) => {
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });

  export const login = (email, password) =>
    new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });
