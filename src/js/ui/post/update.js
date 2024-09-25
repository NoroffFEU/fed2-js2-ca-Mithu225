import { updatePost } from "../../api/post/update";

export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;

  const title = form.elements["title"].value;
  const body = form.elements["body"].value;
  const tags = form.elements["tags"].value;
  const url = form.elements["url"].value;
  const alt = form.elements["image-alt"].value;
  const postId = form.elements["post-id"].value;

  const data = {
    title: title,
    body: body,
    tags: tags.split(","),
    media: {
      url: url,
      alt: alt,
    },
  };

  try {
    await updatePost(postId, data); 
    window.location.href = `/post/${postId}`; 
  } catch (error) {
    console.log(error);
    const errors = error.response?.data?.errors || [];
    const errorsElm = document.getElementById("errors");

    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });

    errorsElm.innerHTML = newErrors.join("");
  }
}




