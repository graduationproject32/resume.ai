import boto3
from dotenv import load_dotenv
from pprint import pprint

ENDPOINT = 'https://s3.us-west-004.backblazeb2.com'
BUCKET_NAME = 'gradproject32'
# OBJECT_NAME = '/Users/eyadahmed/Downloads/grad proj daigrams.pdf'
# Never, ever, ever put credentials in your code!
load_dotenv()


def uploadpdf_On_backblaze(OBJECT_NAME, pdf_file):
    try:
        # AWS_ACCESS _KEY_ID & AWS_SECRET_ACCESS_KEY
        client = boto3.client('s3', endpoint_url=ENDPOINT)
        # response = client.list_buckets()
        client.put_object(
            Body=pdf_file,
            Key=OBJECT_NAME,
            Bucket=BUCKET_NAME,
            ContentType='application/pdf')
        response = client.get_object(Bucket=BUCKET_NAME,
                                     Key=OBJECT_NAME)
        body = response['Body'].read()
        # pprint(body)
        print(f'{BUCKET_NAME}/{OBJECT_NAME} contains "{body}"', '\n')
    except Exception as e:
        raise e
