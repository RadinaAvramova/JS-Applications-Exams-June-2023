import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll, getProfileData } from "../api/data.js";

const ProfileTemplate = (info, email) => html`<section id="profilePage">
  <div class="userInfo">
    <div class="avatar">
      <img src="./images/profilePic.png">
    </div>
    <h2>${email}</h2>
  </div>
  <div class="board">
    ${info.length > 0
    ? info.map(x => profileCard(x))
    : html`
    <!--If there are no event-->
    <div class="no-events">
      <p>This user has no events yet!</p>
    </div>`}
  </div>
</section>
`;

const profileCard = (info) => html`
<div class="eventBoard">
  <div class="event-info">
    <img src="${info.imageUrl}">
    <h2>${info.title}</h2>
    <h6>${info.date}</h6>
    <a href="/details/${info._id}" class="details-button">Details</a>
  </div>
</div>`;

export async function profilePage(ctx) {
  const email = ctx.user.email
  const id = ctx.user._id
  const info = await getProfileData(id);
  ctx.render(ProfileTemplate(info, email));
}