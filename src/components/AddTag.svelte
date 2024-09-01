<script lang="ts">
    import type Tag from "../lib/tags";
    import Popup from "./Popup.svelte";
    export let user_tags: Tag[] = [];
    let tag_name: string = "";
    let tag_add: boolean = false;
    let tag_success: boolean = false;
    let tag_delete: boolean = false;
    let tag_delete_success: boolean = false;
    let error_msg: string = "";
    let selected_tags: string[] = [];

    async function add_tag() {
        try {
            if (tag_name.length <= 0) return;
            let tag: Tag = { tag_id: "", name: tag_name };
            const response = await fetch(`/api/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            });
            if (response.ok) {
                tag_add = true;
                tag_success = true;
                tag_name = "";
                window.location.reload();
            } else {
                tag_add = true;
                tag_success = false;
            }
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) error_msg = error.message;
            else {
                error_msg = "An unknown error occurred";
            }
            tag_add = true;
            tag_success = false;
        }
    }

    function select_all_tags(e: any) {
        if (selected_tags.length == user_tags.length) {
            selected_tags = [];
        } else {
            selected_tags = user_tags.map((tag) => tag.tag_id);
        }
    }

    async function delete_selected_tags() {
        try {
            const response = await fetch(`/api/tags/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selected_tags),
            });

            if (response.ok) {
                tag_delete = true;
                tag_delete_success = true;
                selected_tags = [];
                window.location.reload();
            } else {
                tag_delete = true;
                tag_delete_success = false;
            }
        } catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                error_msg = error.message;
                console.log(error.message);
            } else {
                error_msg = "An unknown error occurred";
            }
            tag_delete = true;
            tag_delete_success = false;
        }
    }
</script>

{#if tag_add && tag_success}
    <Popup
        msg="Tag Added Successfully!"
        path="/project/notecards/tags"
        success={true}
        loc="Okay"
    />
{:else if tag_add && !tag_success}
    <Popup
        msg="Failed to add tag."
        path="/project/notecards"
        error={error_msg}
        success={false}
        loc="Okay"
    />
{/if}

{#if tag_delete && !tag_delete_success}
    <Popup
        msg="Failed to delete tags."
        path="/project/notecards/tags"
        success={false}
        error={error_msg}
        loc="Okay"
    />
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
    {#if selected_tags.length > 0}
        <button class="delete-selected-button" on:click={delete_selected_tags}
            >Delete Selected</button
        >
    {/if}
    <table>
        <thead>
            <tr>
                <th
                    ><input
                        type="checkbox"
                        checked={user_tags.length == selected_tags.length &&
                            user_tags.length != 0}
                        on:change={select_all_tags}
                    /></th
                >
                <th>Tag Name</th>
                <th>Tag ID</th>
            </tr>
        </thead>
        <tbody>
            {#each user_tags as tag}
                <tr>
                    <td
                        ><input
                            type="checkbox"
                            bind:group={selected_tags}
                            value={tag.tag_id}
                        /></td
                    >
                    <td>{tag.name}</td>
                    <td>{tag.tag_id}</td>
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
        background-color: rgba(0, 0, 0, 0.3);
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

    .delete-selected-button {
        background-color: red;
        color: whitesmoke;
        padding: 0.8rem 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 1rem;
        font-weight: 800;
        font-size: 100%;
    }

    .delete-selected-button:hover {
        background-color: darkred;
    }

    #Page {
        right: 0;
        margin-top: 0.1rem;
        width: 100%;
        text-align: center;
        align-items: center;
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

    input[type="checkbox"] {
        transform: scale(1.2);
    }

    input[type="checkbox"]:checked {
        background-color: var(--color-primary-200);
        border-color: var(--color-primary-200);
    }
</style>
