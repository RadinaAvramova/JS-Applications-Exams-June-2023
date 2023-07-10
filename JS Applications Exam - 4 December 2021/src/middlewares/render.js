import { render, html } from "../../node_modules/lit-html/lit-html.js";

const root = document.getElementById("main-content");
const navBar = document.getElementById("navBar");

function ctxReder(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(updateNav(ctx.user), navBar);
  ctx.render = ctxReder;

  next();
}

const updateNav = (user) =>
  html`<nav>
    <img src="./images/headphones.png" />
    <a href="/">Home</a>
    <ul>
      <li><a href="/catalog">Catalog</a></li>
      <li><a href="/search">Search</a></li>

      ${user
        ? html`<li><a href="/create" class="user">Create Album</a></li>
            <li><a href="/logout" class="user">Logout</a></li>`
        : html`<li><a href="/login" class="guest">Login</a></li>
            <li><a href="/register" class="guest">Register</a></li>`}
    </ul>
  </nav>`;