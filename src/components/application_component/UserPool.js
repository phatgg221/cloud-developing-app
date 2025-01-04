import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_1v56Lb2gv",
    ClientId: "2gjpon357ujm2enjd9qcngn5lm",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
