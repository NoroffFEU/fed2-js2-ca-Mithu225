import axios from "axios";

export async function register({ name, email, password, bio, banner, avatar }) {
  const result = await axios.post(API_AUTH_REGISTER, {
    name: name,
    email: email,
    password: password,
  });

  return result.data;
}
