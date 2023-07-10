import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const catalogTemplate = (info, ctx) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${info.length > 0
      ? info.map((m) => cardBox(m, ctx))
      : html`<p>No Albums in Catalog!</p>`}
</section>
`;

const cardBox = (card, ctx) => html`
<div class="card-box">
    <img src="${card.imgUrl}"/>
    <div>
        <div class="text-center">
            <p class="name">Name:${card.name}</p>
            <p class="artist">Artist:${card.artist}</p>
            <p class="genre">Genre:${card.genre}</p>
            <p class="price">Price:${card.price}</p>
            <p class="date">Release Date:${card.releaseDate}</p>
        </div>
        ${ctx.user 
        ? html`<div class="btn-group">
            <a href="/details/${card._id}" id="details">Details</a>
        </div>` : nothing}
        
    </div>
</div>
    `;

export async function catalogPage(ctx) {
    const info = await getAll();
    ctx.render(catalogTemplate(info, ctx));
}