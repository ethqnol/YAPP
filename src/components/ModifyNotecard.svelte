<script lang="ts">
    import type DatabaseNotecard from "../lib/notecard_database.ts";
    import Popup from "./Popup.svelte";
    import type DatabaseSource from "../lib/source_database.ts";
    export let notecard: DatabaseNotecard | null = null;
    export let sources: DatabaseSource[] = [];

    let notecard_add = false;
    let notecard_success = false;

    let quote = notecard ? notecard.notecard.quote : "";
    let analysis = notecard ? notecard.notecard.analysis : "";
    let start_page = notecard ? notecard.notecard.start_page : 0;
    let end_page = notecard ? notecard.notecard.end_page : 0;
    let selected_source = notecard ? notecard.notecard.source_id : sources.length > 0 ? sources[0].primary_id : "";

    let title : string = notecard ? notecard.notecard.title : "";
    async function handle_submit() {
        const updated_notecard = {
            source_id: selected_source,
            student_id: notecard ? notecard.notecard.student_id : "",
            quote,
            analysis,
            title,
            start_page: start_page,
            end_page: end_page,
        };

        try {
            const response = await fetch(`/api/notecards/${notecard ? ("edit/" + notecard.primary_id) : "add"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updated_notecard),
            });
            
            notecard_add = true;
            if (response.ok) {
                notecard_success = true;
            } 
            
        } catch (error) {
            console.error("Error:", error);
            notecard_add = true;
        }
    }
</script>

<div class="form-container">
    {#if notecard_add}
        <div class="overlay"></div>
    {/if}

    {#if notecard_add && notecard_success}
        <Popup
            msg="Success!"
            path="/project/notecards"
            success={true}
            loc="Go To Notecards"
        />
    {:else if notecard_add && !notecard_success}
        <Popup
            msg="Failed to add notecard."
            path="/project/notecards"
            success={false}
            loc="Go To Notecards"
        />
    {/if}
    <form on:submit|preventDefault={handle_submit}>
        <div class="form-group">
            <label for="source">Source</label>
            <select id="source" bind:value={selected_source}>
                {#each sources as source}
                  <option value={source.primary_id}>{`${source.source.title}; ${source.source.full_citation.slice(0, 50) + (source.source.full_citation.length > 50 ? "..." : "")}` }</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="title">Title</label>
            <input id="title" bind:value={title} required />
        </div>
        <div class="form-group">
            <label for="quote">Quote</label>
            <textarea id="quote" bind:value={quote} required />
        </div>

        <div class="form-group">
            <label for="analysis">Analysis</label>
            <textarea id="analysis" bind:value={analysis} required></textarea>
        </div>

        <div class="form-group">
            <label for="startPage">Start Page</label>
            <input
                id="startPage"
                type="number"
                bind:value={start_page}
                required
            />
        </div>

        <div class="form-group">
            <label for="endPage">End Page</label>
            <input id="endPage" type="number" bind:value={end_page} required />
        </div>

        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .form-container {
        width: 100%;
        color: white;
        margin: 0rem auto;
        background-color: #20232a;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        display: flex;
        right: 0.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    form {
        width: calc(100vw - 2rem - 20vw);
        max-width: calc(100vw - 2rem - 20vw);
    }
    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        font-size: 14px;
        border: 1px solid #cccccc;
        border-radius: 4px;
        box-sizing: border-box;
        transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        border-color: #007bff;
        outline: none;
    }

    .form-group textarea {
        resize: vertical;
        min-height: 120px;
    }

    .submit-button {
        display: inline-block;
        width: 100%;
        padding: 12px;
        font-size: 16px;
        color: #ffffff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }
</style>
