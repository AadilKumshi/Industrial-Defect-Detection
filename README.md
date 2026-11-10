# Industrial Defect Detection

A CNN-based industrial surface defect classification system that
identifies defects in steel surface images using deep learning.

## Overview

The system uses a custom-trained CNN built with TensorFlow/Keras to
classify steel surface images into six defect categories:

-   Crazing
-   Inclusion
-   Patches
-   Pitted Surface
-   Rolled-in Scale
-   Scratches

Users can upload an image through the web interface and receive the
predicted defect, model confidence, and probability distribution across
all six classes.

## Tech Stack

-   **Deep Learning:** TensorFlow, Keras
-   **Backend:** Python, FastAPI
-   **Frontend:** React, Vite, Tailwind CSS
-   **Deployment:** Docker, Render, Vercel

## Project Structure

``` text
Industrial-Defect/
├── backend/
│   ├── app/
│   │   ├── artifacts/
│   │   ├── config/
│   │   ├── inference/
│   │   ├── routes/
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## Running Locally

### Backend

``` bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API documentation: `http://127.0.0.1:8000/docs`

### Frontend

Create a `.env` file inside `frontend/`:

``` env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Then run:

``` bash
cd frontend
npm install
npm run dev
```

## API

  Method   Endpoint     Description
  -------- ------------ ---------------------------------------
  GET      `/health`    Backend health check
  POST     `/predict`   Predict defect from an uploaded image

## Model Details

-   **Architecture:** Convolutional Neural Network (CNN)
-   **Framework:** TensorFlow/Keras
-   **Input Size:** 200 × 200 RGB
-   **Output:** Six defect classes

------------------------------------------------------------------------

Built as an end-to-end deep learning application, from model development
to deployment.
