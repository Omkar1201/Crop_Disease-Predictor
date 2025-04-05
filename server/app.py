from flask import Flask,request,render_template,jsonify
from flask_cors import CORS
from fileinput import filename
import os
from pathlib import Path
from werkzeug.utils import secure_filename
import numpy as np
import tensorflow as tf    
import cv2 
import pickle as pkl
from temp import getData
from prompt import generate
import requests
import json
import os
from dotenv import load_dotenv

UPLOAD_FOLDER=Path('use')
app=Flask(__name__)
CORS(app)

@app.route("/")
def data():
    return "MobileNet Model Api developed by Hustle Hulk"


@app.route("/predictions")
def info():
    return render_template('index.html')

@app.route("/predictions",methods=['GET','POST'])
def prediction():
            try:
                file = request.files['file_from_react']
                if file.filename!='':
                    fn = secure_filename(file.filename)
                    if(fn not in os.listdir(UPLOAD_FOLDER)):
                        file.save(os.path.join(UPLOAD_FOLDER, fn))
                    
                    img=cv2.imread(os.path.join(UPLOAD_FOLDER, fn))
                    resize = tf.image.resize(img, (256,256))
                    
                    model=pkl.load(open('model.pkl','rb'))
                    
                    yhat = model.predict(np.expand_dims(resize/255, 0))
                    
                    data=getData(np.argmax(yhat))
                    if(data[1]!="Healthy"):
                        text=generate(c=data[0],d=data[1])
                        return jsonify({"Crop":data[0].capitalize(),"Disease":data[1].capitalize(),"cause":text[0],"sym":text[1],"cure":text[2],"isHealthy":False})
                    else:
                        return jsonify({"Crop":data[0].capitalize(),"Disease":"N/A","cause":"N/A","sym":"N/A","cure":"N/A","isHealthy":True})
            except Exception as e:
                  return jsonify({"Crop":"error","Disease":"error"})
             

load_dotenv()
GOOGLE_TRANSLATE_API_KEY = os.getenv("GOOGLE_TRANSLATE_API_KEY")

@app.route("/translation",methods=['GET','POST'])
def translate_text():
    if request.method == "POST":
        try:
            data = request.get_json()
            plant_data = data.get("plantData", {})
            target_lang = data.get("targetLanguage", "en")

            translated_data = {}
            for key, value in plant_data.items():
                if value.strip():
                    response = requests.post(
                        "https://translation.googleapis.com/language/translate/v2",
                        data={
                            "q": value,
                            "target": target_lang,
                            "format": "text",
                            "key": GOOGLE_TRANSLATE_API_KEY
                        }
                    )
                    response_data = response.json()
                    translated_text = response_data["data"]["translations"][0]["translatedText"]
                    translated_data[key] = translated_text
                else:
                    translated_data[key] = value
            return jsonify({"translations": translated_data})
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"Request error: {str(e)}"}), 500
        except KeyError as e:
            return jsonify({"error": f"Key error: {str(e)}"}), 500
        except Exception as e:
            return jsonify({"error": f"Internal error: {str(e)}"}), 500
if __name__=="__main__":
    app.run(debug=True,host='0.0.0.0',port=8000)