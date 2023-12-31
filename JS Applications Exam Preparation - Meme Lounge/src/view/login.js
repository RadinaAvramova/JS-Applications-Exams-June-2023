import {html} from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { showError } from "./notify.js";



export function loginView(ctx){

    ctx.render(loginTemplate(onLog));

    async function onLog(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        if(!inputs.email || !inputs.password){
            showError("Invalid entries!");

            return        
        }

        await login(inputs);
        ctx.updateNav()
        ctx.page.redirect("/catalog");

    }

}

function loginTemplate(onLog){
    return html`
        <section id="login">
            <form @submit=${onLog} id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`
}