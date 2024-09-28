import { onDeletePost } from "../ui/post/delete";
import { onClickBySelectors } from "./utils";

export function handlePostButtons(renderPost, posts) {
  onClickBySelectors("#username", (userElm) => {
    const dataUserName = userElm.getAttribute("data-username");
    localStorage.setItem("dataUserName", dataUserName);
    window.location.href = "/profile/";
  });

  onClickBySelectors("#edit-button", (button) => {
    const buttonDataId = button.getAttribute("data-id");
    localStorage.setItem("post-id", buttonDataId);
    window.location.href = "/post/edit/";
  });

  onClickBySelectors("#delete-button", async (button) => {
    const buttonDeleteId = button.getAttribute("data-id");
    await onDeletePost(buttonDeleteId);
    renderPost(posts.filter((item) => item.id != buttonDeleteId));
  });

  onClickBySelectors("#see-more", (button) => {
    const buttonSeemoreID = button.getAttribute("data-id");
    localStorage.setItem("single-post-id", buttonSeemoreID);
    window.location.href = "/post/";
  });
}
