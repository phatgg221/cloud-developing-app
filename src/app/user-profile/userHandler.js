const AWS = require('aws-sdk');

// Initialize DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Table name
const USERS_TABLE = 'Users';

exports.handler = async (event) => {
  const { httpMethod, pathParameters, body } = event;

  const userId = pathParameters ? pathParameters.id : null;

  try {
    if (httpMethod === 'GET' && userId) {
      // Fetch user data
      const params = {
        TableName: USERS_TABLE,
        Key: { id: userId },
      };
      const result = await dynamoDB.get(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Item || {}),
      };
    } else if (httpMethod === 'PUT' && userId) {
      // Update user data
      const { name, email } = JSON.parse(body);

      const params = {
        TableName: USERS_TABLE,
        Key: { id: userId },
        UpdateExpression: 'set #name = :name, email = :email',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: {
          ':name': name,
          ':email': email,
        },
        ReturnValues: 'ALL_NEW',
      };

      const result = await dynamoDB.update(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error }),
    };
  }
};
