import { updatePost } from "../../api/post/update";

export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;

  const title = form.elements["title"].value;
  const body = form.elements["body"].value;
  const tags = form.elements["tags"].value;
  const url = form.elements["image-url"].value;
  const alt = form.elements["image-alt"].value;

  const data = {
    title: title,
    body: body,
    tags: tags.split(","),
    media: {
      url: url,
      alt: alt,
    },
  };

  const id = localStorage.getItem("post-id");
  const messageBox = document.getElementById("message-box");
  try {
    await updatePost(id, data);
    messageBox.innerHTML = "Update successful!";
    messageBox.style.color = "green";
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  } catch (error) {
    
    const errors = error.response?.data?.errors || [];
    const errorsElm = document.getElementById("errors");

    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });

    errorsElm.innerHTML = newErrors.join("");
  }
}
