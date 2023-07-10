import { html } from "../../node_modules/lit-html/lit-html.js";
import { getDetails, onUpdate } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (info, onEdit) => html`
  <section id="editPage">
    <form @submit = ${onEdit} class="theater-form">
      <h1>Edit Theater</h1>
      <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value=${info.title} />
      </div>
      <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${info.date} />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author" value=${info.author} />
      </div>
      <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description" placeholder="Description" .value=${info.description}></textarea>
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
          value="${info.imageUrl}" />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;
  const info = await getDetails(id);
  ctx.render(editTemplate(info, createSubmitHandler(ctx, onEdit)));

  async function onEdit(ctx, data, ev) {
    const id = ctx.params.id;
    if (Object.values(data).some((f) => f == "")) {
      return alert("All fields are require!");
    }
    await onUpdate(id, {
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      imageUrl: data.imageUrl,    
    });

    ev.target.reset();
    ctx.page.redirect("/details/" + id);
  }
}