import boto3
import json
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Specify the table name
table_name = 'TABLE_TABLES'
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
    # Check if it's a direct array payload
    if isinstance(event, list):
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Array processed successfully', 'data': event})
        }
    
    # Handle normal API Gateway payload
    try:
        
        http_method = event.get("httpMethod", "GET")
        
        if http_method == "GET":
            return get_table_items()
        elif http_method == "POST":
            body = json.loads(event.get("body", "{}"))
            return create_table_item(body)
        elif http_method == "PUT":
            body = json.loads(event.get("body", "{}"))
            return update_table_item(body)
        elif http_method == "DELETE":
            body = json.loads(event.get("body", "{}"))
            return delete_table_item(body)
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Unsupported HTTP method'})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def convert_to_decimal(data):
    """
    Recursively converts float values to Decimal for DynamoDB compatibility.
    """
    if isinstance(data, list):
        return [convert_to_decimal(i) for i in data]
    elif isinstance(data, dict):
        return {k: convert_to_decimal(v) for k, v in data.items()}
    elif isinstance(data, float):
        return Decimal(str(data)) 
    return data


def get_table_items():
    try:
        response = table.scan()
        items = response.get('Items', [])
        
        items = decimal_to_native(items)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Menu retrieved successfully', 'data': items})
        }
    except Exception as e:
        print(f"An error occurred while retrieving menu items: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def create_table_item(data):
    try:
        # Check if the input is a list
        if isinstance(data, list):
            # Iterate over each item in the list
            for item in data:
                # Validate required fields
                if not item.get("id") or not item.get("title") or not item.get("dishes"):
                    return {
                        'statusCode': 400,
                        'body': json.dumps({'error': 'Missing required fields in one or more items'})
                    }


                item["id"] = str(item["id"])

                # Convert float values to Decimal
                item = convert_to_decimal(item)

                # Insert each item into the table
                table.put_item(Item=item)

            return {
                'statusCode': 201,
                'body': json.dumps({'message': 'All food items created successfully'})
            }
        else:
            # Single item case
            if not data.get("id") or not data.get("title") or not data.get("dishes"):
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'Missing required fields'})
                }

            # Convert the id to string to match DynamoDB's expected type
            data["id"] = str(data["id"])

            # Convert float values to Decimal
            data = convert_to_decimal(data)

            # Insert a single item into the table
            table.put_item(Item=data)

            return {
                'statusCode': 201,
                'body': json.dumps({'message': 'Food item created successfully'})
            }
    except Exception as e:
        print(f"An error occurred while creating food item(s): {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }



def update_table_item(data):
    try:
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

def delete_table_item(data):
    try:
        # Ensure 'id' is provided in the request
        if 'id' not in data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Food ID is required for deletion'})
            }

        # Delete the item from the table
        table.delete_item(
            Key={'id': str(data['id'])}  # Convert id to string
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Food item deleted successfully'})
        }
    except Exception as e:
        print(f"An error occurred while deleting food item: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }