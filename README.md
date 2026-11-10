# Industrial Defect Detection

A CNN-based industrial surface defect classification system that
identifies defects in steel surface images using deep learning.
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


## CNN Architecture

The model takes a 200 × 200 RGB steel surface image as input and passes
it through three convolutional blocks. Extracted features are then
aggregated and passed through fully connected layers to predict one of
the six defect classes.

``` text
                 INPUT IMAGE
                200 × 200 × 3
                       |
                       v
              RESCALING (1./255)
                       |
                       v
             ┌───────────────────┐
             │  CONVOLUTION 2D   │
             │  32 filters, 3×3  │
             │  Batch Normalization
             │  ReLU Activation  │
             │  Max Pooling      │
             └───────────────────┘
                       |
                  100 × 100 × 32
                       |
                       v
             ┌───────────────────┐
             │  CONVOLUTION 2D   │
             │  64 filters, 3×3  │
             │  Batch Normalization
             │  ReLU Activation  │
             │  Max Pooling      │
             └───────────────────┘
                       |
                   50 × 50 × 64
                       |
                       v
             ┌───────────────────┐
             │  CONVOLUTION 2D   │
             │ 128 filters, 3×3  │
             │  Batch Normalization
             │  ReLU Activation  │
             │  Max Pooling      │
             └───────────────────┘
                       |
                   25 × 25 × 128
                       |
                       v
          GLOBAL AVERAGE POOLING
                       |
                    128
                       |
                       v
             ┌───────────────────┐
             │   DENSE: 128      │
             │ Batch Normalization
             │  ReLU Activation  │
             └───────────────────┘
                       |
                       v
             ┌───────────────────┐
             │    DENSE: 64      │
             │ Batch Normalization
             │  ReLU Activation  │
             └───────────────────┘
                       |
                       v
                DENSE: 6
              SOFTMAX OUTPUT
                       |
                       v
                PREDICTED CLASS
```

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

## Model Details

-   **Architecture:** Convolutional Neural Network (CNN)
-   **Framework:** TensorFlow/Keras
-   **Input Size:** 200 × 200 RGB
-   **Output:** Six defect classes
-   **Train Accuracy:** 99.69%
-   **Validation Accuracy:** 99.41%
-   **Test Accuracy:** 99.44%

------------------------------------------------------------------------

Built as an end-to-end deep learning application, from model development
to deployment.
