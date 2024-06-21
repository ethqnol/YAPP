<script lang="ts">
    import type Tag from "../lib/tags";
    import Popup from "./Popup.svelte";
    export let user_tags: Tag[] = [];
    let tag_name: string = "";
    let tag_add: boolean = false;
    let tag_success: boolean = false;
    let tag_delete: boolean = false;
    let tag_delete_success: boolean = false;
    async function add_tag() {
        try {
            if (tag_name.length <= 0) return;

            const response = await fetch(`/api/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag_name),
            });
            if (response.ok) {
                tag_add = true;
                tag_success = true;
                window.location.reload();
            } else {
                tag_add = true;
                tag_success = false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function delete_tag(tag_id: string) {
        try {
            const response = await fetch(`/api/tags/${tag_id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                tag_delete = true;
                tag_delete_success = true;
                window.location.reload();
            } else {
                tag_delete = true;
                tag_delete_success = false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>




{#if tag_add && !tag_success}
    <Popup
        msg="Failed to add tag."
        path="/project/notecards/tags"
        success={false}
        loc="Okay"
    />
    <div class="overlay"></div>
{/if}

{#if tag_delete && !tag_delete_success}
    <Popup
        msg="Failed to delete tag."
        path="/project/notecards/tags"
        success={false}
        loc="Okay"
    />
    <div class="overlay"></div>
{/if}

<div id="Page">
    <form on:submit|preventDefault={add_tag} class="tag-container">
        <input
            class="input-field"
            type="text"
            placeholder="Enter tag name"
            bind:value={tag_name}
            maxlength="30"
        />
        <button class="add-button" type="submit" on:click={add_tag}
            >Add Tag</button
        >
    </form>

    <table>
        <thead>
            <tr>
                <th>Tag Name</th>
                <th>Tag ID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each user_tags as tag}
                <tr>
                    <td>{tag.name}</td>
                    <td>{tag.tag_id}</td>
                    <td>
                        <button on:click={() => delete_tag(tag.tag_id)}
                            >Delete</button
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .tag-container {
        background: var(--color-surface-mixed-200);
        padding: 0.4rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: calc(100vw - 2rem - 60vw);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        justify-content: space-between;
    }

    .input-field {
        background-color: rgb(0, 0, 0, 0.3);
        border: solid 1px gray;
        height: 100%;
        border-radius: 5px;
        transition: 0.2s;
        color: grey;
        padding: 10px;
        width: 100%;
        margin-bottom: 0.5rem;
        font-size: medium;
        box-sizing: border-box;
        position: relative;
    }

    .input-field::placeholder {
        color: var(--color-primary-500);
    }

    .add-button {
        background-color: var(--color-primary-200);
        color: whitesmoke;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .add-button:hover {
        background-color: var(--color-primary-300);
    }

    #Page {

        right: 0;
        margin-top: 0.1rem;
        width: 100%;
        text-align: center;
        align-items: center;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    table {
        background: var(--color-surface-mixed-200);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: calc(100vw - 1rem - 60vw);
        width: calc(100vw - 1rem - 60vw);
        margin: 0 auto;
        margin-bottom: 1rem;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid var(--color-surface-mixed-200);
    }

    th {
        background-color: var(--color-primary-200);
        color: white;
    }
    tr {
        background-color: var(--color-surface-300);
    }
    tr:hover {
        background-color: var(--color-primary-100);
    }

    button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: darkred;
    }
</style>
