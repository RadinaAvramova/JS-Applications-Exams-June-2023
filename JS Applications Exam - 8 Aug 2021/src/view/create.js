import {html} from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";

export async function createView(ctx){

    async function onCreate(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        if (Object.values(inputs).some(input => input == '')){
            alert("Invalid entries!");
            return;
        }

        await createItem(inputs);
        ctx.page.redirect("/catalog");

    }

    ctx.render(createTemplate(onCreate))
}

function createTemplate(onCreate){
    return html`
        <section id="create-page" class="create">
            <form @submit=${onCreate} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>`
    
}