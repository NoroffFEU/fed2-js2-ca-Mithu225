import { readPost } from "../../api/post/read";
import { onLogout } from "../../ui/auth/logout";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const id = localStorage.getItem("post-id");
const result = await readPost(id);
const form = document.forms.updatePost;
console.log(result);
form.elements["title"].value = result.data.title;
form.elements["body"].value = result.data.body;
form.elements["tags"].value = result.data.tags;
form.elements["image-url"].value = result.data.media.url;
form.elements["image-alt"].value = result.data.media.alt;

document
  .querySelector("#cancel-post-submit-button")
  .addEventListener("click", () => {
    localStorage.removeItem("post-id");
    window.location.href = "/";
  });

form.addEventListener("submit", onUpdatePost);
onClickBySelector("#list", () => {
  window.location.href = "/";
});

onClickBySelector("#profile", () => {
  window.location.href = "/profile/";
});
onClickBySelector("#logout-button", onLogout);
