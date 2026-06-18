import { apiRequest } from "./api";

export function simplifyConcept(payload) {
  return apiRequest("/api/concept-simplify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

