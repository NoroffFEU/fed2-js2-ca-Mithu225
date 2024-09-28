import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";
import { handleHeaderButtons } from "../../utilities/header";
import { onClickBySelector } from "../../utilities/utils";

authGuard();

const id = localStorage.getItem("post-id");
const result = await readPost(id);
const form = document.forms.updatePost;

form.elements["title"].value = result.data.title;
form.elements["body"].value = result.data.body;
form.elements["tags"].value = result.data.tags;
form.elements["image-url"].value = result.data.media.url;
form.elements["image-alt"].value = result.data.media.alt;

onClickBySelector("#cancel-post-submit-button", () => {
  localStorage.removeItem("post-id");
  window.location.href = "/";
});

form.addEventListener("submit", onUpdatePost);

handleHeaderButtons();
