import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  try {
    await register({ name, email, password });
    window.location.href = "/auth/login/";
  } catch (error) {
    const errors = error.response.data.errors;
    const errorsElm = document.getElementById("errors");

    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });

    errorsElm.innerHTML = newErrors;
  }
}
