import { render, html } from "../../node_modules/lit-html/lit-html.js";

const root = document.getElementById("content");
const navBar = document.getElementById("nav-bar");

function ctxReder(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(updateNav(ctx.user), navBar);
  ctx.render = ctxReder;

  next();
}

const updateNav = (user) => html`
<nav>
  <a href="/">Theater</a>
  <ul>
    ${user
    ? html`
    <!--Only users-->
    <li><a href="/profilePage">Profile</a></li>
    <li><a href="/create">Create Event</a></li>
    <li><a href="/logout">Logout</a></li>`
    : html`
    <!--Only guest-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`}
  </ul>
</nav>
  `;