<script lang="ts">
    import type Notecard from "../lib/notecard";
    import type Tag from "../lib/tags";
    import type DatabaseSource from "../lib/source_database";
    import { generate_page_number } from "../lib/lib";
    export let notecard: Notecard;
    export let href: string;
    export let tags: Tag[] = [];
    export let source: DatabaseSource;

    $: show_tags = false;
    $: show_footnote = false;
    $: show_move = false;
    $: show_delete = false;
    function show_tag_menu() {
        show_tags = !show_tags;
        show_footnote = false;
        show_move = false;
        show_delete = false;
    }

    function show_footnote_menu() {
        show_tags = false;
        show_move = false;
        show_footnote = !show_footnote;
        show_delete = false;
    }

    function show_move_menu() {
        show_tags = false;
        show_footnote = false;
        show_move = !show_move;
        show_delete = false;
    }

    function show_delete_menu() {
        show_tags = false;
        show_footnote = false;
        show_move = false;
        show_delete = !show_delete;
    }

    let tag_selection: string[] = notecard.tags ? notecard.tags : [];

    async function add_tags() {
        try {
            const response = await fetch(`/api/notecards/tags/${source.primary_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tag_selection),
                },
            );
            if (response.ok) {
                show_tags = false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    async function delete_card() {
        try {
            const response = await fetch(`/api/notecards/delete/${source.primary_id}`, {
                    method: "DELETE",
                },
            );
            if (response.ok) {
                show_tags = false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="link-card">
    <a {href}>
        <h2>
            {notecard.title}
            <span>&rarr;</span>
        </h2>
        <p>
            {notecard.quote.slice(0, 65) +
                (notecard.quote.length > 65 ? "..." : "")}
        </p>
        <p class="page-numbers">
            Pages: {notecard.start_page} - {notecard.end_page}
        </p>
    </a>
    <div class="actions">
        <button class="icon tag-icon" title="Tag" on:click={show_tag_menu}>
            <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                />
            </svg>
        </button>
        {#if show_tags}
            <form class="tag-menu" on:submit|preventDefault={add_tags}>
                {#each tags as tag}
                    <label
                        ><input
                            type="checkbox"
                            bind:group={tag_selection}
                            value={tag.tag_id}
                        />
                        {tag.name}</label
                    >
                {/each}
                <button type="submit" class="submit-button">Submit</button>
            </form>
        {/if}

        <button class="icon pile-icon" title="Pile" on:click={show_move_menu}>
            <svg
                class="w-[28px] h-[28px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    fill-rule="evenodd"
                    d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm11.707-7.707a1 1 0 0 0-1.414 1.414l.293.293H8a1 1 0 1 0 0 2h5.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-2-2Z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        {#if show_move}
            <p class="move-menu">Currently Under Development :D</p>
        {/if}

        <button class="icon footnote-icon" title="Generate Footnote" on:click={show_footnote_menu}>
            <svg
                class="w-[28px] h-[28px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    fill-rule="evenodd"
                    d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        {#if show_footnote}
            <div class="footnote-menu">
                <p>{source.source.footnote_long + ", " + generate_page_number(notecard.start_page, notecard.end_page) + "."}</p>
                <p>{source.source.footnote_short + ", " + generate_page_number(notecard.start_page, notecard.end_page) + "."}</p>
            </div>
        {/if}

        <button class="icon delete-icon" title="Delete" on:click={show_delete_menu}>
            <svg
                class="w-[28px] h-[28px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.7"
                    d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        </button>
        
        {#if show_delete}
            <form class="delete-menu" on:submit|preventDefault={delete_card}>
                <p>Are you sure you want to delete this notecard? (This process is irreversible)</p>
                <button type="submit" class="delete-button">Delete</button>
            </form>
        {/if}
        
        
    </div>
</div>

<style>
    .link-card {
        display: flex;
        flex-direction: column;
        max-height: 18vh;
        height: 18vh;
        padding: 1px;
        background-color: var(--color-surface-mixed-300);
        background-image: none;
        background-size: 400%;
        border-radius: 7px;
        background-position: 100%;
        transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        overflow: hidden;
        position: relative;
    }
    .link-card > a {
        flex: 1;
        text-decoration: none;
        line-height: 1.4;
        max-height: 16vh;
        overflow: hidden;
        padding: calc(1.5rem - 1px);
        border-radius: 8px 8px 0 0;
        color: white;
        background-color: #23262d;
        opacity: 0.8;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    h2 {
        margin: 0;
        font-size: 1rem;
        transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    p {
        margin-top: 0.3rem;
        margin-bottom: 0;
        font-size: 0.9rem;
    }
    .page-numbers {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
    }
    .actions {
        display: flex;
        justify-content: space-around;
        padding: 0.3rem;
        border-radius: 0 0 8px 8px;
        background-color: rgba(35, 38, 45, 0.9);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        min-height: 1rem;
    }
    .icon {
        font-size: 1.2rem;
        cursor: pointer;
        transition: color 0.3s;
        position: relative;
        padding: 0;
        border: none;
        background-color: transparent;
        color: white;
    }
    .icon:hover {
        color: rgb(var(--accent-light));
    }
    .icon:hover::after {
        content: attr(title);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1;
        opacity: 1;
        transition: opacity 0.3s;
    }
    .icon::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
    }
    .tag-menu {
        position: absolute;
        bottom: 120%;
        transform: translateX(-45%) translateY(10%);
        max-width: 45%;
        width: 45%;
        max-height: 12vh;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1px 0.6rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 2;
        display: none;
        text-align: left;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }
    .tag-menu label {
        color: white;
        font-size: 0.8rem;

        cursor: pointer;
    }

    .tag-icon:hover + .tag-menu,
    .tag-icon:focus + .tag-menu,
    .tag-menu:hover,
    .tag-menu:focus-within {
        display: flex;
    }
    
    
    .move-menu {
        position: absolute;
        bottom: 120%;
        transform: translateY(10%);
        max-width: 45%;
        width: 45%;
        max-height: 12vh;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1px 0.6rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 2;
        display: none;
        text-align: left;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }
    /* .move-menu label {
        color: white;
        font-size: 0.8rem;

        cursor: pointer;
    } */

    .pile-icon:hover + .move-menu,
    .pile-icon:focus + .move-menu,
    .move-menu:hover,
    .move-menu:focus-within {
        display: flex;
    }
    
    
    .footnote-menu {
        position: absolute;
        bottom: 120%;
        transform: translateY(10%);
        max-width: 45%;
        width: 45%;
        max-height: 12vh;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1rem;
        overflow: auto;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 2;
        display: none;
        text-align: left;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .footnote-icon:hover + .footnote-menu,
    .footnote-icon:focus + .footnote-menu,
    .footnote-menu:hover,
    .footnote-menu:focus-within {
        display: flex;
    }
    
    .delete-menu {
        position: absolute;
        bottom: 120%;
        transform: translateX(45%) translateY(10%);
        max-width: 45%;
        width: 45%;
        max-height: 12vh;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1px 0.6rem;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 2;
        display: none;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.8);
    }
 
    
    .delete-icon:hover + .delete-menu,
    .delete-icon:focus + .delete-menu,
    .delete-menu:hover,
    .delete-menu:focus-within {
        display: flex;
    }
    
    .link-card:is(:hover, :focus-within) {
        background-position: 0;
        background-image: var(--accent-gradient);
    }
    .link-card:is(:hover, :focus-within) h2 {
        color: rgb(var(--accent-light));
    }

    *::-webkit-scrollbar {
        width: 10px;
    }

    *::-webkit-scrollbar-track {
        background: var(--color-surface-mixed-500);
    }

    *::-webkit-scrollbar-thumb {
        background-color: var(--color-surface-mixed-300);
        border-radius: 10px;
        border: 2px solid var(--color-surface-mixed-500);
    }
    
    .submit-button {
        padding: 4px;
        border: none;
        background-color: var(--color-primary-100);
        border-radius: 4px;
        margin-bottom: 0.5rem;
        color: white;
    }
    
    .submit-button:hover {
        background-color: var(--color-primary-200);
        cursor: pointer;
    }
    
    
    
    .delete-button {
        padding: 4px;
        border: none;
        background-color: red;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        color: white;
    }
    
    .delete-button.delete-button:hover {
        background-color: darkred;
        cursor: pointer;
    }
    
    
</style>
