const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialize AWS services
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

const BOOKINGS_TABLE = 'Bookings';
const ADMIN_SNS_TOPIC_ARN = 'arn:aws:sns:<region>:<account_id>:AdminNotifications';

exports.handler = async (event) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'POST') {
    try {
      const { date, time, people } = JSON.parse(body);

      // Create a new booking entry
      const bookingId = uuidv4();
      const newBooking = {
        id: bookingId,
        date,
        time,
        people,
        status: 'Pending',
      };

      const params = {
        TableName: BOOKINGS_TABLE,
        Item: newBooking,
      };

      await dynamoDB.put(params).promise();

      // Send SNS notification to admins
      const snsMessage = `New booking received: ${people} people on ${date} at ${time}. Booking ID: ${bookingId}`;
      await sns
        .publish({
          Message: snsMessage,
          TopicArn: ADMIN_SNS_TOPIC_ARN,
        })
        .promise();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Booking created successfully', bookingId }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error creating booking', error }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};
