import axios from "axios";
export async function updateProfile(username, { avatar, banner }) {
  const result = await axios.put(API_SOCIAL_PROFILES, {
    username: username,
    avatar: avatar,
    banner: banner,
  });
  return result.data;
}
