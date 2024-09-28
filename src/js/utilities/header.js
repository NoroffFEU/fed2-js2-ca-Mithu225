import { onLogout } from "../ui/auth/logout";
import { getLoggedUser, onClickBySelector } from "./utils";

export function handleHeaderButtons() {
  const user = getLoggedUser();
  onClickBySelector("#list", () => {
    window.location.href = "/";
  });

  onClickBySelector("#profile", () => {
    localStorage.setItem("dataUserName", user.name);
    window.location.href = "/profile/";
  });

  onClickBySelector("#logout-button", onLogout);
}
