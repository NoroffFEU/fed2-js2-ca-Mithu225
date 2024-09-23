import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const result = await readPost("?????");
const form = document.forms.updatePost;

form.elements["title"].value = result.data.title;
form.elements["body"].value;
form.elements["tags"].value;
form.elements["media"].value;
form.elements["image-alt"].value;
form.elements["post-id"].value;


form.addEventListener("submit", onUpdatePost);
