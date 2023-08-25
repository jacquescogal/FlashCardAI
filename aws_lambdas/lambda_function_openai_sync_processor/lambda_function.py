import openai
import os
import boto3
import time

openai.api_key = os.environ['API_KEY']

def lambda_handler(event,context):
    """
    Calls openai with api key, model and messages to get reponse.
    Triggered by openai_entry_point function as an async event.
    Updates the database and responds with statusCode 200 and empty body.
    """
    client = boto3.client('lambda')
    query_parameters = event.get('queryStringParameters', {})
    task_id=query_parameters['task_id']

    messages=[]

    if (query_parameters.get('system_content',None)!=None):
        messages.append({"role":"system","content":query_parameters.get('system_content')})
    if (query_parameters.get('assist_content',None)!=None):
        messages.append({"role":"assistant","content":query_parameters.get('assist_content')})
    messages.append({"role":"user","content":query_parameters['user_content']})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    dynamo = boto3.resource('dynamodb')
    table = dynamo.Table(os.environ['DYNAMODB_TABLE'])
    table.put_item(
        Item={
            'task_id': task_id,
            'status': 'complete',
            'response':response.choices[0]['message']['content'],
            'timestamp': int(time.time())
        }
    )
    
    sns = boto3.client('sns')
    response = sns.publish(
        TopicArn=os.environ['SNS_ARN'],
        Message='Lambda processing completed'
    )
    
    return {
        'statusCode':200,
        'body': ''
    }