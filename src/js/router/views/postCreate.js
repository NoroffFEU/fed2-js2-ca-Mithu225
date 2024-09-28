import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { handleHeaderButtons } from "../../utilities/header";
import { onClickBySelector } from "../../utilities/utils";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
onClickBySelector("#cancel-post-submit-button", () => {
  window.location.href = "/";
});

handleHeaderButtons();
