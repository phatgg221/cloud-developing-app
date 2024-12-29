import boto3
import json
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Specify the table name
table_name = 'FOOD_TABLES'
table = dynamodb.Table(table_name)

# Helper function to convert Decimal to native Python types
def decimal_to_native(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    elif isinstance(obj, list):
        return [decimal_to_native(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: decimal_to_native(v) for k, v in obj.items()}
    return obj

def lambda_handler(event, context):
    try:
        # Parse the HTTP method (e.g., GET, POST, PUT)
        http_method = event.get("httpMethod", "")
        
        # Parse the request body
        body = json.loads(event.get("body", "{}"))
        
        # Handle different HTTP methods
        if http_method == "POST":  # Create a new food item
            return create_food_item(body)
        elif http_method == "PUT":  # Update an existing food item
            return update_food_item(body)
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Unsupported HTTP method'})
            }
    except Exception as e:
        print(f"An error occurred: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Function to create a new food item
def create_food_item(data):
    try:
        # Insert a new item into the table
        table.put_item(Item=data)
        
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Food item created successfully'})
        }
    except Exception as e:
        print(f"An error occurred while creating food item: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# Function to update an existing food item
def update_food_item(data):
    try:
        # Ensure 'id' is provided in the request
        if 'id' not in data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Food ID is required for updates'})
            }
        
        # Build the update expression and attribute values
        update_expression = "SET "
        expression_attribute_values = {}
        for key, value in data.items():
            if key != "id":
                update_expression += f"{key} = :{key}, "
                expression_attribute_values[f":{key}"] = value
        
        # Remove the trailing comma and space
        update_expression = update_expression.rstrip(", ")

        # Update the item in the table
        response = table.update_item(
            Key={'id': data['id']},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )
        
        # Return the updated attributes
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Food item updated successfully',
                'updatedAttributes': decimal_to_native(response.get("Attributes", {}))
            })
        }
    except Exception as e:
        print(f"An error occurred while updating food item: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
