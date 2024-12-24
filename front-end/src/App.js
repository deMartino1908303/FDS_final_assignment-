import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      features: Object.values(formData).map(Number),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="App">
      <div className="container py-5">
        <h1 className="text-center mb-5 title-text">Health Assessment Predictor</h1>

        <form className="form-container shadow-lg" onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="row g-4">
            {[
              { id: 'age', label: 'Age', type: 'number' },
              { id: 'assessment-season', label: 'Assessment Season', type: 'select', options: ['Fall', 'Spring', 'Summer', 'Winter'] },
              { id: 'functioning-score', label: 'Global Functioning Score', type: 'number' },
              { id: 'bmi', label: 'Body Mass Index (BMI)', type: 'number' },
              { id: 'height', label: 'Height (cm)', type: 'number' },
              { id: 'diastolic-bp', label: 'Diastolic Blood Pressure', type: 'number' },
              { id: 'heart-rate', label: 'Heart Rate (BPM)', type: 'number' },
              { id: 'systolic-bp', label: 'Systolic Blood Pressure', type: 'number' },
              { id: 'upper-strength', label: 'Core Upper Strength', type: 'number' },
              { id: 'bia-season', label: 'Body Impedance Analysis Season', type: 'select', options: ['Fall', 'Spring', 'Summer', 'Winter'] },
              { id: 'fat-free-mass', label: 'Fat-Free Mass Index', type: 'number' },
              { id: 'fat-mass', label: 'Fat Mass Index', type: 'number' },
              { id: 'paq-score', label: 'Physical Activity Score (Child)', type: 'number' },
              { id: 'difficulty-score', label: 'Total Difficulty Score (Raw)', type: 'number' },
              { id: 'internet-usage', label: 'Internet Usage (Hours per Day)', type: 'number' },
              { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
            ].map((field, idx) => (
              <div key={idx} className="col-md-3">
                <label htmlFor={field.id} className="form-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="form-select input-field"
                    id={field.id}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={i + 1}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    className="form-control input-field"
                    id={field.id}
                    placeholder={`Enter ${field.label}`}
                    required
                    step="0.01"
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-gradient btn-lg px-5">Predict</button>
          </div>
        </form>

        {/* Prediction Result */}
        {prediction !== null && (
          <div className="mt-5 alert alert-info">
            <h4 className="alert-heading">Prediction Result</h4>
            <p>
              {prediction === 0 && " No Signs of Problematic Internet Use"}
              {prediction === 1 && "Mild Signs of Problematic Internet Use"}
              {prediction === 2 && "Moderate Signs of Problematic Internet Use"}
              {prediction === 3 && "Severe Signs of Problematic Internet Use"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
