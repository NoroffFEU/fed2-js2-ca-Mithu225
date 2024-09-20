import axios from "axios";

export async function updatePost({ title, body, tags, media }) {
  const result = await axios.put(API_SOCIAL_POSTS, {
    title: title,
    body: body,
    tags: tags,
    media: media,
  });
  return result.data;
}
