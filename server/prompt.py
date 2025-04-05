import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)

def generate(c, d):

    # Check if the key is loaded
    if not GOOGLE_API_KEY:
        raise ValueError("API key not found. Set the API key in your environment variables.")

    # Use the correct model name
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Generate responses
    resp1 = model.generate_content(f"What are the causes of {d} in {c}?")
    resp2 = model.generate_content(f"What are the symptoms of {d} in {c}?")
    resp3 = model.generate_content(f"What is the cure for {d} in {c}?")

    # Return responses properly
    return [resp.candidates[0].content.parts[0].text.replace('•', '  *') for resp in [resp1, resp2, resp3]]


def generate1():
  

   # Select the model
  model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Generate content
  response = model.generate_content("How does AI work?")
    
    # Print the response
  print(response.text)
  return response.text
