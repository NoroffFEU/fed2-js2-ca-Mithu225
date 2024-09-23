import axios from "axios";
import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }) {
  const result = await axios.post(API_AUTH_LOGIN, {
    email: email,
    password: password,
  });

  return result.data;
}
