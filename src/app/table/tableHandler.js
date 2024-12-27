const AWS = require('aws-sdk');

// Initialize DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Table name
const TABLES_TABLE = 'Tables';

exports.handler = async (event) => {
  try {
    // Scan DynamoDB table to fetch all tables
    const params = {
      TableName: TABLES_TABLE,
    };

    const result = await dynamoDB.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving tables', error }),
    };
  }
};
