import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteDetail, getDetails } from "../api/data.js";

const detailsTemplate = (moreInfo, owner, user, onDelete) => html`
<section id="detailsPage">
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${moreInfo.title}</h1>
      <div>
        <img src="${moreInfo.imageUrl}" />
      </div>
    </div>

    <div class="details">
      <h3>Theater Description</h3>
      <p>${moreInfo.description}</p>
      <h4>Date: ${moreInfo.date}</h4>
      <h4>Author: ${moreInfo.author}</h4>
      ${user
    ? owner
        ? html`<div class="buttons">
        <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        <a class="btn-edit" href="/edit/${moreInfo._id}">Edit</a>

      </div>` :html`<a class="btn-like" href="#">Like</a>`
    : nothing}

      <p class="likes">Likes: 0</p>
    </div>
  </div>
</section>
`;

export async function detailseView(ctx) {
  const id = ctx.params.id;
  const moreInfo = await getDetails(id);
  const user = ctx.user
  if (user) {
    const userId = ctx.user._id;
    const ownerId = moreInfo._ownerId;
    const owner = hasOwner(userId, ownerId);
    ctx.render(detailsTemplate(moreInfo, owner, user, onDelete));
  } else {
    ctx.render(detailsTemplate(moreInfo));
  }

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
      await deleteDetail(id);
      ctx.page.redirect('/catalog')
    }
  }
}

function hasOwner(userId, ownerId) {
  return Boolean(userId === ownerId);
}