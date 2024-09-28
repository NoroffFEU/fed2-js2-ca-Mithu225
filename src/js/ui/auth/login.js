import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  try {
    const result = await login({ email, password });
    localStorage.setItem("token", result.data.accessToken);
    localStorage.setItem("user", JSON.stringify(result.data));
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
