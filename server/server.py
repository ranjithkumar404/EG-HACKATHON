from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from q_learning_agent import QLearningAgent
app = Flask(__name__)
CORS(app)

# Specify the path to the saved pickle file
    


# Define your translation function or model here
def translate_to_python(vb_code):
    try:
        file_path = 'q_learning_agent11.pkl'


        with open(file_path, 'rb') as f:
            loaded_model = pickle.load(f)

        print("vb_code", vb_code)
        print("strting to push into model")
        # Call the translation method from the loaded model
        python_code = loaded_model.translate_vb_to_python(vb_code)

        # Check if the translation result is valid
        if python_code is None or not isinstance(python_code, str):
            raise ValueError("Translation result is invalid or empty")
        print("python_code", python_code)
        # Return the translated Python code
        return python_code

    except Exception as e:
        # Log the specific error encountered during translation
        print(f"Translation error: {e}")
        # Raise a custom exception to indicate translation failure
       # raise TranslationError("Translation failed") from e

@app.route('/translate', methods=['POST'])
def translate():
    try:
        # Get the code from the request
        print("we got the code at serverr")
        data = request.get_json()
        #print("data", data)
        vb_code = data['code']
        print("data has been extracted")
        #print(code_to_translate)
        # Process the code (translate VB to Python)
        translated_code = translate_to_python(vb_code)
        #print(translated_code)
        # Return the translated code as a response
        return jsonify({'translated_code': translated_code}), 200

    except KeyError as e:
        return jsonify({'error': 'Invalid request data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
