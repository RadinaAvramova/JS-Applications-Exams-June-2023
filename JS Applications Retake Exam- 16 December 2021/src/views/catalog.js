import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const catalogTemplate = (info) => html`
  <section class="welcomePage">
    <div id="welcomeMessage">
      <h1>My Theater</h1>
      <p>
        Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI
        Cooperating Members, theatre professionals, theatre organizations,
        theatre universities and theatre lovers all over the world on the 27th
        of March. This day is a celebration for those who can see the value and
        importance of the art form “theatre”, and acts as a wake-up-call for
        governments, politicians and institutions which have not yet recognised
        its value to the people and to the individual and have not yet realised
        its potential for economic growth.
      </p>
    </div>
    <div id="events">
      <h1>Future Events</h1>
      <div class="theaters-container">
        ${info.length > 0
          ? info.map((x) => catalogCard(x))
          : html` <!--No Theaters-->
              <h4 class="no-event">No Events Yet...</h4>`}
      </div>
    </div>
  </section>
`;

const catalogCard = (info) => html`
<div class="eventsInfo">
  <div class="home-image">
    <img src="${info.imageUrl}">
  </div>
  <div class="info">
    <h4 class="title">${info.title}</h4>
    <h6 class="date">${info.date}</h6>
    <h6 class="author">${info.author}</h6>
    <div class="info-buttons">
      <a class="btn-details" href="/details/${info._id}">Details</a>
    </div>
  </div>
</div>`;

export async function catalogPage(ctx) {
  const info = await getAll();
  ctx.render(catalogTemplate(info));
}