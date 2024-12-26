from flask import Flask, jsonify, request
import google.generativeai as genai
import os
import requests

app = Flask(__name__)

@app.route('/test-api-key', methods=['POST'])
def test_api_key():
    try:
        # Ensure the API key is being set correctly
        api_key = os.getenv('GEMINI_API_KEY')  # Assuming you're setting it via environment variables
        if not api_key:
            return jsonify({"error": "API key not found"}), 400

        # URL for the Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

        # Get the prompt from the request body
        data = request.get_json()
        prompt = data.get("prompt", "Write a story about a magic backpack.")

        # Prepare the data in the format expected by Google's API
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        # Send the request to Gemini API
        response = requests.post(url, json=payload)

        # Check for a successful response
        if response.status_code == 200:
            content = response.json()
            return jsonify({
                "message": "API key is valid",
                "response": content
            })
        else:
            return jsonify({
                "error": f"Failed to generate content, status code: {response.status_code}, message: {response.text}"
            }), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
