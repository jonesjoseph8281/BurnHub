from flask import Flask, request, jsonify
import os
import requests
import logging
from flask_cors import CORS  # Importing CORS

# Set up Flask app
app = Flask(__name__)

# Enabling CORS for all routes
CORS(app)  # Allow all domains, you can restrict this if needed

# Set up your Gemini API key (assuming it's in an environment variable)
gemini_api_key = os.getenv('GEMINI_API_KEY')

# Basic route to check if the server is running
@app.route('/')
def home():
    return "Server is running"

@app.route('/get-bad-advice', methods=['POST'])
def get_bad_advice():
    try:
        # Parse the incoming JSON request
        data = request.get_json()
        if not data or 'question' not in data:
            return jsonify({'error': 'Invalid request data'}), 400
        
        question = data['question']
        print(f"Received question: {question}")

        # Ensure the API key is available
        if not gemini_api_key:
            return jsonify({"error": "API key not found"}), 400

        # URL for the Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_api_key}"

        # Prepare the prompt for generating bad advice
        prompt = f"Give me a small paragraph in a sarcastic way about {question} .Use simple words but make it funny"

        # Prepare the data for the API request
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        # Send the POST request to the Gemini API
        response = requests.post(url, json=payload)

        # Log the full response for debugging
        logging.info(f"API response: {response.text}")

        # Check for a successful response
        if response.status_code == 200:
            content = response.json()

            # Log the full response content for inspection
            logging.info(f"Parsed response: {content}")

            # Extracting the advice text from the response
            if 'candidates' in content and len(content['candidates']) > 0:
                advice = content['candidates'][0]['content']['parts'][0].get('text', "No advice found")
            else:
                advice = "No advice found"

            # Return advice in the expected format
            return jsonify({"advice": advice})

        else:
            return jsonify({
                "error": f"Failed to generate bad advice, status code: {response.status_code}, message: {response.text}"
            }), 500

    except Exception as e:
        # Log the error and return a generic message
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
