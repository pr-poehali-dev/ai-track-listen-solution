import json
import os
import base64
import uuid
from datetime import datetime
import boto3

s3 = boto3.client('s3',
    endpoint_url='https://bucket.poehali.dev',
    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
)

def handler(event: dict, context) -> dict:
    '''API для управления треками: загрузка аудио и метаданных'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Author-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            title = body.get('title')
            genre = body.get('genre')
            audio_base64 = body.get('audioFile')
            cover_base64 = body.get('coverFile')
            
            if not all([title, genre, audio_base64]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуются поля: title, genre, audioFile'}),
                    'isBase64Encoded': False
                }
            
            track_id = str(uuid.uuid4())
            
            audio_data = base64.b64decode(audio_base64)
            audio_key = f'tracks/audio/{track_id}.mp3'
            s3.put_object(
                Bucket='files',
                Key=audio_key,
                Body=audio_data,
                ContentType='audio/mpeg'
            )
            audio_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{audio_key}"
            
            cover_url = None
            if cover_base64:
                cover_data = base64.b64decode(cover_base64)
                cover_key = f'tracks/covers/{track_id}.jpg'
                s3.put_object(
                    Bucket='files',
                    Key=cover_key,
                    Body=cover_data,
                    ContentType='image/jpeg'
                )
                cover_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{cover_key}"
            
            track_metadata = {
                'id': track_id,
                'title': title,
                'artist': 'Пачук Константин',
                'genre': genre,
                'audioUrl': audio_url,
                'cover': cover_url or 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop',
                'plays': '0',
                'duration': '0:00',
                'uploadedAt': datetime.utcnow().isoformat()
            }
            
            metadata_key = f'tracks/metadata/{track_id}.json'
            s3.put_object(
                Bucket='files',
                Key=metadata_key,
                Body=json.dumps(track_metadata),
                ContentType='application/json'
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'track': track_metadata
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка загрузки: {str(e)}'}),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        try:
            response = s3.list_objects_v2(Bucket='files', Prefix='tracks/metadata/')
            
            tracks = []
            if 'Contents' in response:
                for obj in response['Contents']:
                    metadata_obj = s3.get_object(Bucket='files', Key=obj['Key'])
                    track_data = json.loads(metadata_obj['Body'].read().decode('utf-8'))
                    tracks.append(track_data)
            
            tracks.sort(key=lambda x: x.get('uploadedAt', ''), reverse=True)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'tracks': tracks}),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка получения треков: {str(e)}'}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }
