import boto3
import json
import uuid
import time
import os

def lambda_handler(event,context):
    client = boto3.client('lambda')
    query_parameters = event.get('queryStringParameters', {})

    if query_parameters.get('user_content',None)==None:
        return {
            'statusCode': 400,
            'body': 'Bad request. No user input passed.'
        }
    
    task_id = str(uuid.uuid4())
    dynamo = boto3.resource('dynamodb')
    table = dynamo.Table(os.environ['DYNAMODB_TABLE'])
    table.put_item(
        Item={
            'task_id': task_id,
            'status': 'processing',
            'timestamp': int(time.time())
        }
    )

    payload = {
        "queryStringParameters": {
            "system_content": query_parameters.get('system_content',None),
            "assist_content": query_parameters.get('assist_content',None),
            "user_content": query_parameters['user_content'],
            "task_id":task_id
        } 
    }

    response = client.invoke(
        FunctionName=os.environ['PROCESSOR_ARN'], # Replace with the name or ARN of the second function
        InvocationType='Event', # Use 'Event' for async invocation
        Payload=json.dumps(payload)
    )

    return {
        'statusCode': 202,
        'body': {
            'task_id': task_id,
            'status_url': f'/tasks/{task_id}/status'
        }
    }