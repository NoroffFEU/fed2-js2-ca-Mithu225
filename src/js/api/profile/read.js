import { API_SOCIAL_PROFILES } from "../constants";
import { getHeaders } from "../headers";
import axios from "axios";

export async function readProfile(username) {
  const result = await axios.get(`${API_SOCIAL_PROFILES}/${username}`, {
    headers: getHeaders(),
  });
  return result.data;
}

export async function readProfiles(limit, page) {}
