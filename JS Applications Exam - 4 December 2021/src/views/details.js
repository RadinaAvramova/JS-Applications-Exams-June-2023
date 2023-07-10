import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { onDelete, onDetails } from "../api/data.js";

const detailsTemplate = (info, owner, onClick) => html`
  <section id="detailsPage">
    <div class="wrapper">
      <div class="albumCover">
        <img src="${info.imgUrl}" />
      </div>
      <div class="albumInfo">
        <div class="albumText">
          <h1>Name: ${info.name}</h1>
          <h3>Artist: ${info.artist}</h3>
          <h4>Genre: ${info.genre}</h4>
          <h4>Price:$ ${info.price}</h4>
          <h4>Date: ${info.releaseDate}</h4>
          <p>${info.description}</p>
        </div>

        ${owner
          ? html` <div class="actionBtn">
              <a href="/edit/${info._id}" class="edit">Edit</a>
              <a @click=${onClick} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
          : nothing}
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const infoDetails = await onDetails(id);
  if (ctx.user) {
    const userId = ctx.user._id;
    const ownerId = infoDetails._ownerId;
    const owner = hasOwner(userId, ownerId);
    console.log(infoDetails);
    ctx.render(detailsTemplate(infoDetails, owner, onClick));
  } else {
    ctx.render(detailsTemplate(infoDetails));
  }

  async function onClick() {
    const choice = confirm("Are you sure you want to delete this album?");
    if (choice) {
      await onDelete(id);
      ctx.page.redirect("/catalog");
    }
  }
}

function hasOwner(userId, ownerId) {
  return Boolean(userId === ownerId);
}