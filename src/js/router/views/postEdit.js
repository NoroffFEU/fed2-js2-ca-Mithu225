import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const id = localStorage.getItem("post-id")
const result = await readPost(id);
const form = document.forms.updatePost;
console.log(result);
form.elements["title"].value = result.data.title;
form.elements["body"].value = result.data.body;
form.elements["tags"].value = result.data.tags;
form.elements["image-url"].value = result.data.media.url;
form.elements["image-alt"].value = result.data.media.alt;

form.addEventListener("submit", onUpdatePost);
