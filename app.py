from flask import Flask, request, jsonify
import pickle
import numpy as np
import os

app = Flask(__name__)

# Load model

model_path = "model.pkl"
print("Trying to load model from:", os.path.abspath(model_path))

if not os.path.exists(model_path):
    print("❌ ERROR: model.pkl NOT found at", model_path)
else:
    print("✅ model.pkl found!")

@app.route("/")
def home():
    return "Flask API is working!"

@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        return jsonify({"error": "Model not loaded properly"}), 500

    try:
        data = request.json
        features = np.array([[
            int(data["pclass"]),
            1 if data["sex"].lower() == "male" else 0,
            float(data["age"]),
            int(data["sibsp"]),
            int(data["parch"]),
            float(data["fare"]),
            {"C": 0, "Q": 1, "S": 2}[data["embarked"].upper()]
        ]])

        prediction = model.predict(features)[0]
        result = "Survived" if prediction == 1 else "Did Not Survive"

        return jsonify({"prediction": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
