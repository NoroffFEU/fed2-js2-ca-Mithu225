import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;

  const title = form.elements["title"].value;
  const body = form.elements["body"].value;
  const tags = form.elements["tags"].value;
  const media = form.elements["media"].value;
  const alt = form.elements["image-alt"].value;

  const data = {
    title: title,
    body: body,
    tags: tags.split(","),
    media: {
      url: media,
      alt: alt,
    },
  };

  console.log(data);

  try {
    await createPost(data);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    const errorsElm = document.getElementById("errors");

    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });

    errorsElm.innerHTML = newErrors;
  }
}
