import page from "../node_modules/page/page.mjs";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

import { logout } from "./api/user.js";

page(addSession);
page(addRender);

page("/", homePage);
page("/catalog", catalogPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);
page("/search", searchPage);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/logout", onLogout);

page.start();

function onLogout() {
  logout();
  page.redirect("/");
}
