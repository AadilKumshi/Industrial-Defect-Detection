
from io import BytesIO

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError
from starlette.concurrency import run_in_threadpool

from app.inference.inference import DefectClassifier


router = APIRouter(prefix="/predict", tags=["prediction"])

classifier = DefectClassifier()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("")
async def predict(file: UploadFile = File(...)):

    # Basic MIME type validation
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=415,
            detail="The uploaded file must be an image."
        )

    image_data = await file.read(MAX_FILE_SIZE + 1)

    if not image_data:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    if len(image_data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image size must not exceed 10 MB."
        )

    try:
        image = Image.open(BytesIO(image_data))
        image.load()

        # Reject unsupported or multi-frame images
        if image.format not in {"JPEG", "PNG", "WEBP", 'BMP'}:
            raise HTTPException(
                status_code=415,
                detail="Only JPEG, PNG and WEBP images are supported."
            )

        if getattr(image, "n_frames", 1) != 1:
            raise HTTPException(
                status_code=415,
                detail="Animated images are not supported."
            )

    except UnidentifiedImageError as exc:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        ) from exc

    except OSError as exc:
        raise HTTPException(
            status_code=400,
            detail="Unable to process the uploaded image."
        ) from exc

    result = await run_in_threadpool(classifier.predict, image)

    return result
