import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const api = axios.create({ baseURL: API_BASE_URL, timeout: 60000 });

export async function predictDefect(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/predict", formData);
  return response.data;
}

export async function checkBackendHealth() {
  try {
    const response = await api.get("/health");
    return response.data?.status === "healthy";
  } catch (error) {
    try {
      const fallback = await api.get("/");
      return fallback.data?.status === "healthy";
    } catch {
      return false;
    }
  }
}

export function getPredictionError(error) {
  const status = error.response?.status;
  const detail = error.response?.data?.detail;
  if (status === 413) return "This image is larger than the 10 MB limit.";
  if (status === 415) return detail || "This image format is not supported.";
  if (status === 400) return detail || "The backend could not process this image.";
  if (status >= 500) return "The AI engine could not complete the analysis.";
  if (!error.response) return "The backend is unavailable. Check that the API is running.";
  return "Something went wrong while analyzing the image. Please try again.";
}
