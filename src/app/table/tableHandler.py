import boto3
import json
import os
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
TABLES_TABLE = os.environ.get('TABLES_TABLE') 


def decimal_to_native(obj):
    if isinstance(obj, list):
        return [decimal_to_native(item) for item in obj]
    if isinstance(obj, dict):
        return {key: decimal_to_native(value) for key, value in obj.items()}
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj

def get_tables():
    """
    Fetch all available tables from the DynamoDB table.
    """
    table = dynamodb.Table(TABLES_TABLE)

    try:
 
        response = table.scan()
        items = response.get("Items", [])

  
        native_items = decimal_to_native(items)

        return {
            "statusCode": 200,
            "body": json.dumps(native_items)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to fetch tables", "error": str(e)})
        }

# Main handler for AWS Lambda
def handler(event, context):
    """
    AWS Lambda entry point for handling requests.
    """
    http_method = event.get("httpMethod")

    if http_method == "GET":
        return get_tables()
    else:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": f"Unsupported HTTP method: {http_method}"})
        }
