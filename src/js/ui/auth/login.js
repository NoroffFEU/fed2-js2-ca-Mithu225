import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  const result = await login({ email, password });
  console.log(result);
}
