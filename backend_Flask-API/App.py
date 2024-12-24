from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)


CORS(app)

with open('RandomForest_Model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('Scaler_For_Live_Data.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Welcome to the Health Assessment Predictor "
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = np.array([data['features']])

        # Scale features
        scaled_features = scaler.transform(features)

        # Predict
        prediction = model.predict(scaled_features)[0]
        return jsonify({'prediction': int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
