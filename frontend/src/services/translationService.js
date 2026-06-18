import { apiRequest } from "./api";

export function translateText(payload) {
  return apiRequest("/api/translate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

