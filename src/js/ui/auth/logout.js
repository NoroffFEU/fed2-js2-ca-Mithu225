export function onLogout() {
  localStorage.removeItem("token");
  localStorage.clear();
  window.location.href = "/auth/login/";
}
