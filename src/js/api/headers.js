import { API_KEY } from "./constants";

export function getHeaders() {
  const headers = {};
  const token = localStorage.getItem("token");

  if (API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}
