import page from '../node_modules/page/page.mjs';
import { logout } from './api/user.js';
import { addRender } from './middleware/render.js';
import { addSession } from './middleware/session.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailseView } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profilePage.js';
import { registerPage } from './views/register.js';

page(addSession)
page(addRender)
page('/', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/profilePAge', profilePage);
page('/create', createPage);
page('/details/:id', detailseView);
page('/logout', onLogout);
page('/edit/:id', editPage);

page.start();

async function onLogout() {
    await logout();
    page.redirect('/catalog')
}