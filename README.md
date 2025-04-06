# Plant Disease Prediction System

## Overview
The Plant Disease Prediction System is a web-based application designed to predict plant diseases based on input data. It features:

- **Text-to-Speech**: Allows users to listen to disease details.
- **Regional Language Support**: Supports multiple languages for better accessibility.
- **Disease Prediction**: Identifies the disease in plants based on symptoms and provides detailed information, including causes, symptoms, and cures.


## Frontend

The frontend is built with **React** and **Vite** for fast development and smooth user experience. The frontend interacts with the backend to predict diseases and display the necessary information.

#### Features:
- **Text-to-Speech**: Integrated feature to read aloud disease details.
- **Regional Language Support**: Translates disease data into regional languages.
- **Disease Prediction**: Displays predictions based on the user’s input.

#### Setup:
1. Clone the repository.

2. Install dependencies:
   ```bash
   npm install

3. Set up the .env file in the root directory and add:
    ```bash
    VITE_BASE_URL=http://localhost:8000
    
4. Run the development server:
    ```bash
    npm run dev

## Backend

The backend is built with **Flask**, a lightweight Python framework. It handles requests from the frontend and performs disease predictions.

#### Features:
- **Disease Prediction API**: Receives data and predicts plant diseases.
- **Google API Integration**: Uses Google Translate for regional language support.
- **Gemini Integration**: Integrates with Gemini for advanced AI-driven predictions and analysis.


#### Setup:
1. Clone the repository.

2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Set up the `.env` file in the backend directory and add:
    ```bash
    GOOGLE_API_KEY = your-gemini-key
    GOOGLE_TRANSLATE_API_KEY = your_google_cloud_translate_api_key

4. Run the Flask app:
    ```bash
    python app.py
    
    
## Project Demo
[![Video Thumbnail](https://img.youtube.com/vi/vbGXBciTOmI3Dvof/0.jpg)](https://www.youtube.com/watch?v=vbGXBciTOmI3Dvof)

