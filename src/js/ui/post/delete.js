import { deletePost } from "../../api/post/delete";

export async function onDeletePost(id) {
  const messageBox = document.getElementById("message-box");
  try {
     await deletePost(id);

    messageBox.innerHTML = "Post deleted successfully!";
    messageBox.style.color = "green";
    messageBox.style.display = "block";
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    messageBox.innerHTML = "Failed to delete the post.";
    messageBox.style.color = "red";
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  }
}
