import axios from "axios";

export async function createPost({ title, body, tags, media }) {
  const result = await axios.post(API_AUTH_KEY, {
    title: title,
    body: body,
    tags: tags,
    media: media,
  });
  return result.data;
}
