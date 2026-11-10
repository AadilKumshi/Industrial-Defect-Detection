import { useCallback, useEffect, useState } from "react";
import { checkBackendHealth } from "../services/prediction";

export function useBackendHealth() {
  const [status, setStatus] = useState("checking");
  const checkHealth = useCallback(async () => {
    setStatus("checking");
    setStatus((await checkBackendHealth()) ? "ready" : "unavailable");
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return { status, retry: checkHealth };
}
