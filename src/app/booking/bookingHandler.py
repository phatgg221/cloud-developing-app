import boto3
import json
import os
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
BOOKINGS_TABLE = os.environ.get('BOOKINGS_TABLE')  # Name of the DynamoDB table

def decimal_to_native(obj):
    """
    Convert DynamoDB Decimal objects to native Python types.
    """
    if isinstance(obj, list):
        return [decimal_to_native(i) for i in obj]
    if isinstance(obj, dict):
        return {k: decimal_to_native(v) for k, v in obj.items()}
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj

def handler(event, context):
    """
    AWS Lambda handler for booking operations.
    """
    http_method = event.get("httpMethod")
    path_parameters = event.get("pathParameters", {})
    booking_id = path_parameters.get("id", None)  # Use 'id' as the booking ID

    if http_method == "GET":
        if not booking_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Booking ID is required for fetching booking"})
            }
        return get_booking(booking_id)
    elif http_method == "POST":
        return create_booking(event.get("body"))
    else:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": f"Unsupported HTTP method: {http_method}"})
        }

def get_booking(booking_id):
    """
    Fetch a specific booking by ID.
    """
    table = dynamodb.Table(BOOKINGS_TABLE)

    try:
        response = table.get_item(Key={"id": booking_id})
        item = response.get("Item")

        if not item:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": f"Booking with ID '{booking_id}' not found"})
            }

        # Convert Decimal to native types
        item = decimal_to_native(item)

        return {
            "statusCode": 200,
            "body": json.dumps(item)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to fetch booking", "error": str(e)})
        }

def create_booking(request_body):
    """
    Create a new booking.
    """
    if not request_body:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Request body is required for booking"})
        }

    table = dynamodb.Table(BOOKINGS_TABLE)

    try:
        data = json.loads(request_body)
        booking_id = data.get("id")  # Unique booking ID
        date = data.get("date")
        people = data.get("people")
        time = data.get("time")

        # Validate required fields
        if not (booking_id and date and people and time):
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing required fields"})
            }

        # Add booking to DynamoDB
        table.put_item(
            Item={
                "id": booking_id,
                "date": date,
                "people": Decimal(people),  # Store people as Decimal
                "time": time
            }
        )

        return {
            "statusCode": 201,
            "body": json.dumps({"message": "Booking created successfully"})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to create booking", "error": str(e)})
        }
