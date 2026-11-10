import { useState } from "react";
import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import DefectCategories from "./components/DefectCategories";
import Footer from "./components/Footer";
import { getPredictionError, predictDefect } from "./services/prediction";
import { useBackendHealth } from "./hooks/useBackendHealth";

export default function App() {
  const { status, retry } = useBackendHealth();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [duration, setDuration] = useState(null);

  const handleFileChange = (nextFile, error) => {
    setFile(nextFile);
    setFileError(error);
    setResult(null);
    setRequestError("");
    setDuration(null);
  };

  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;
    setIsAnalyzing(true);
    setRequestError("");
    const startedAt = performance.now();
    try {
      setResult(await predictDefect(file));
      setDuration(Math.round(performance.now() - startedAt));
      retry();
    } catch (error) {
      setRequestError(getPredictionError(error));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar healthStatus={status} onRetry={retry} />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="max-w-2xl">
          <p className="eyebrow">Quality Control Vision System</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Industrial Surface Inspection</h1>
          <p className="mt-4 text-base leading-7 text-muted">Analyze steel surface images using deep learning and identify potential manufacturing defects in seconds.</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent">Powered by a Convolutional Neural Network</p>
        </section>
        <section className="mt-9 grid items-stretch gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <ImageUploader file={file} onFileChange={handleFileChange} onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} error={fileError || requestError} />
          <PredictionResult result={result} file={file} duration={duration} />
        </section>
        <DefectCategories />
      </main>
      <Footer />
    </div>
  );
}
