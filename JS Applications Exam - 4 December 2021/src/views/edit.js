import { html } from "../../node_modules/lit-html/lit-html.js";
import { onDetails, onUpdate } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

export const editTemplate = (info, onSubmit) => html`
  <section class="editPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Edit Album</legend>
  
        <div class="container">
          <label for="name" class="vhide">Album name</label>
          <input id="name" name="name" class="name" type="text" .value=${info.name} />
  
          <label for="imgUrl" class="vhide">Image Url</label>
          <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${info.imgUrl} />
  
          <label for="price" class="vhide">Price</label>
          <input id="price" name="price" class="price" type="text" .value=${info.price} />
  
          <label for="releaseDate" class="vhide">Release date</label>
          <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${info.releaseDate} />
  
          <label for="artist" class="vhide">Artist</label>
          <input id="artist" name="artist" class="artist" type="text" .value=${info.artist} />
  
          <label for="genre" class="vhide">Genre</label>
          <input id="genre" name="genre" class="genre" type="text" .value=${info.genre} />
  
          <label for="description" class="vhide">Description</label>
          <textarea name="description" class="description" rows="10" cols="10" .value=${info.description}></textarea>
  
          <button class="edit-album" type="submit">Edit Album</button>
        </div>
      </fieldset>
    </form>
  </section>
`;

export async function editView(ctx) {
  const id = ctx.params.id;
  const info = await onDetails(id)
  ctx.render(editTemplate(info, createSubmitHandler(ctx,onSubmit)))
}

async function onSubmit(ctx, data, ev) {
  const id = ctx.params.id;
  if (Object.values(data).some(f => f == '')) {
    return alert('All fields are require!')
  }
  await onUpdate(id, {
    name: data.name,
    imgUrl: data.imgUrl,
    price: data.price,
    releaseDate: data.releaseDate,
    artist: data.artist,
    genre: data.genre,
    description: data.description,
  });

  ev.target.reset();
  ctx.page.redirect('/details/' + id)

}