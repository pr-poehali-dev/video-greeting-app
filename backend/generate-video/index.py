import json
import os
import base64
from openai import OpenAI

def handler(event: dict, context) -> dict:
    '''API для генерации видео-поздравлений через OpenAI DALL-E и TTS'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            occasion = body.get('occasion', 'birthday')
            style = body.get('style', 'modern')
            greeting_text = body.get('greetingText', '')
            duration = body.get('duration', 30)

            if not greeting_text:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Текст поздравления обязателен'})
                }

            client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

            occasion_prompts = {
                'birthday': 'festive birthday celebration with balloons, cake, and confetti',
                'wedding': 'elegant wedding ceremony with flowers and romantic atmosphere',
                'holiday': 'cheerful holiday celebration with decorations and festive lights',
                'anniversary': 'romantic anniversary celebration with candles and roses'
            }

            style_modifiers = {
                'modern': 'minimalist, clean, elegant design',
                'festive': 'vibrant colors, dynamic, joyful atmosphere',
                'romantic': 'soft pastel colors, dreamy, tender mood',
                'professional': 'formal, sophisticated, corporate style'
            }

            image_prompt = f"High quality digital art: {occasion_prompts.get(occasion, 'celebration')}, {style_modifiers.get(style, 'beautiful')}. Professional greeting card style, 16:9 aspect ratio"

            image_response = client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size="1792x1024",
                quality="standard",
                n=1
            )

            image_url = image_response.data[0].url

            audio_response = client.audio.speech.create(
                model="tts-1",
                voice="nova",
                input=greeting_text,
                speed=1.0
            )

            audio_base64 = base64.b64encode(audio_response.content).decode('utf-8')

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'imageUrl': image_url,
                    'audioBase64': audio_base64,
                    'duration': duration,
                    'message': 'Видео-поздравление успешно сгенерировано'
                })
            }

        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка генерации: {str(e)}'})
            }

    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
