import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
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

  try {
    await createPost(data);
    window.location.href = "/";
  } catch (error) {
    const errors = error.response.data.errors;
    const errorsElm = document.getElementById("errors");

    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });

    errorsElm.innerHTML = newErrors;
  }
}
