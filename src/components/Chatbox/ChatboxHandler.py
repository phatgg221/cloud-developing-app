import boto3
import json

dynamodb = boto3.resource('dynamodb')
connections_table = dynamodb.Table('Connections')  # Table to store connections
messages_table = dynamodb.Table('Messages')  # Table to store chat messages

def lambda_handler(event, context):
    route_key = event.get('requestContext', {}).get('routeKey')
    connection_id = event.get('requestContext', {}).get('connectionId')
    
    if route_key == '$connect':
        # Store the connection in DynamoDB
        connections_table.put_item(Item={'connectionId': connection_id})
        return {'statusCode': 200}

    elif route_key == '$disconnect':
        # Remove the connection from DynamoDB
        connections_table.delete_item(Key={'connectionId': connection_id})
        return {'statusCode': 200}

    elif route_key == 'sendMessage':
        # Handle sending a message
        body = json.loads(event.get('body', '{}'))
        message = body.get('message', '')
        sender = body.get('sender', 'Customer')

        # Save the message to DynamoDB
        messages_table.put_item(Item={
            'sender': sender,
            'message': message,
        })

        # Broadcast the message to all connected clients
        connections = connections_table.scan().get('Items', [])
        for conn in connections:
            try:
                boto3.client('apigatewaymanagementapi').post_to_connection(
                    ConnectionId=conn['connectionId'],
                    Data=json.dumps({'sender': sender, 'message': message})
                )
            except:
                # Remove invalid connections
                connections_table.delete_item(Key={'connectionId': conn['connectionId']})
        
        return {'statusCode': 200}

    return {'statusCode': 400, 'body': 'Invalid route key'}
