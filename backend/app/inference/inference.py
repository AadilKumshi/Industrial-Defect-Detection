
import json
import logging
import numpy as np
import tensorflow as tf

from pathlib import Path
from PIL import Image


logger = logging.getLogger(__name__)

ARTIFACTS_DIR = Path(__file__).resolve().parents[1] / "artifacts"
MODEL_PATH = ARTIFACTS_DIR / "Industrial-Defect-Classifier.keras"
CLASSES_PATH = ARTIFACTS_DIR / "class_names.json"


class DefectClassifier:

    def __init__(self):
        self.model = tf.keras.models.load_model(MODEL_PATH)

        with CLASSES_PATH.open("r", encoding="utf-8") as f:
            self.class_names = json.load(f)

        # Validate model and class mapping
        if len(self.class_names) != self.model.output_shape[-1]:
            raise ValueError(
                "Number of classes does not match model output dimensions."
            )

        if len(set(self.class_names)) != len(self.class_names):
            raise ValueError("Duplicate class names found.")

        logger.info("Defect classification model loaded successfully.")

    def preprocess_image(self, image: Image.Image):

        image = image.convert("RGB")

        image = image.resize((200, 200))

        image_array = np.asarray(image, dtype=np.float32)

        image_array = np.expand_dims(image_array, axis=0)

        return image_array

    def predict(self, image: Image.Image):

        try:
            processed_image = self.preprocess_image(image)

            predictions = self.model.predict(
                processed_image,
                verbose=0
            )[0]

            predicted_index = int(np.argmax(predictions))

            confidence = float(predictions[predicted_index])

            return {
                "predicted_class": self.class_names[predicted_index],
                "confidence": confidence,
                "probabilities": {
                    class_name: float(probability)
                    for class_name, probability
                    in zip(self.class_names, predictions)
                }
            }

        except Exception:
            logger.exception("Model inference failed.")
            raise
