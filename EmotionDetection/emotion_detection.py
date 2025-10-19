"""Core emotion detection functionality using Watson NLP API."""
import json

import requests


def emotion_detector(text_to_analyze):
    """
    Analyze text for emotions using Watson NLP.

    Args:
        text_to_analyze (str): Text to analyze

    Returns:
        dict: Emotion scores or None values if analysis fails
    """
    url = ('https://sn-watson-emotion.labs.skills.network/v1/'
           'watson.runtime.nlp.v1/NlpService/EmotionPredict')
    headers = {
        "grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"
    }
    myobj = {"raw_document": {"text": text_to_analyze}}

    response = requests.post(url, json=myobj, headers=headers, timeout=10)

    if response.status_code == 200:
        formatted_response = json.loads(response.text)
        emotions = formatted_response['emotionPredictions'][0]['emotion']
        return emotions

    return {
        'anger': None,
        'disgust': None,
        'fear': None,
        'joy': None,
        'sadness': None
    }


def emotion_predictor(detection_result):
    """
    Identify dominant emotion from detection results.

    Args:
        detection_result (dict): Emotion scores from detector

    Returns:
        dict: All scores plus dominant_emotion field
    """
    if detection_result['anger'] is None:
        return {
            'anger': None,
            'disgust': None,
            'fear': None,
            'joy': None,
            'sadness': None,
            'dominant_emotion': None
        }

    dominant_emotion = max(detection_result, key=detection_result.get)

    return {
        'anger': detection_result['anger'],
        'disgust': detection_result['disgust'],
        'fear': detection_result['fear'],
        'joy': detection_result['joy'],
        'sadness': detection_result['sadness'],
        'dominant_emotion': dominant_emotion
    }
