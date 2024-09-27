import { onLogout } from "../../ui/auth/logout";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { onClickBySelector } from "../../utilities/utils";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
onClickBySelector("#cancel-post-submit-button", () => {
  window.location.href = "/";
});
onClickBySelector("#list", () => {
  window.location.href = "/";
});

onClickBySelector("#profile", () => {
  window.location.href = "/profile/";
});
onClickBySelector("#logout-button", onLogout);
