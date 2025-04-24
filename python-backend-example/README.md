
# Python AI Backend for Medical Analysis

This is a sample Python backend for the AI-powered symptom checker and image diagnosis features. The backend uses FastAPI and can be extended with various ML frameworks like PyTorch, TensorFlow, scikit-learn, or Hugging Face transformers.

## Setup

1. Create a Python virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the server:
   ```
   python main.py
   ```

4. The API will be available at `http://localhost:8000/api/`

## API Endpoints

- `POST /api/analyze-symptoms` - Analyze text-based symptom descriptions
- `POST /api/analyze-medical-image` - Analyze medical images for diagnosis

## Integration with Front-end

Configure the Supabase edge functions to point to your Python backend URL by updating the `PYTHON_BACKEND_URL` variable in the edge function code.

## Adding ML Models

This template provides the basic structure. You'll need to:

1. Choose and uncomment the appropriate ML libraries in requirements.txt
2. Implement the model loading and inference logic in the API endpoints
3. Add any preprocessing or postprocessing needed for your specific models
