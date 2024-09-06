<script lang="ts">
    import type DatabaseNotecard from "../lib/notecard_database.ts";
    import Popup from "./Popup.svelte";
    import Loading from "./Loading.svelte";
    import { Carta, MarkdownEditor } from 'carta-md';
	//import 'carta-md/default.css';
	import "./themes/theme.css"
    import type DatabaseSource from "../lib/source_database.ts";
    import DOMPurify from 'isomorphic-dompurify';
    export let notecard: DatabaseNotecard | null = null;
    export let sources: DatabaseSource[] = [];

    
	const carta = new Carta({
	    sanitizer: DOMPurify.sanitize,
	});
    
    let notecard_add = false;
    let notecard_success = false;
    let load = false;
    let error_msg: string = "";
    let quote = notecard ? notecard.notecard.quote : "";
    let analysis = notecard ? notecard.notecard.analysis : "";
    let start_page = notecard ? notecard.notecard.start_page : 0;
    let end_page = notecard ? notecard.notecard.end_page : 0;
    let selected_source = notecard
        ? notecard.notecard.source_id
        : sources.length > 0
          ? sources[0].primary_id
          : "";

    let title: string = notecard ? notecard.notecard.title : "";
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
            load = true
            const response = await fetch(
                `/api/notecards/${notecard ? "edit/" + notecard.primary_id : "add"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updated_notecard),
                },
            );

            notecard_add = true;
            load = false
            if (response.ok) {
                notecard_success = true;
                window.location.href = "/project/notecards";
            } else {
                error_msg = await response.text()
            }
        } catch (error) {
            console.error("Error:", error);
            notecard_add = true;
            if (error instanceof Error) error_msg = error.message;
            else {
                error_msg = "An unknown error occurred";
            }
        }
    }
    let value = "hello world"
</script>

{#if load}
    <Loading />
{/if}

{#if notecard_add && !notecard_success}
    <Popup
        msg="Failed to add notecard."
        path="/project/notecards"
        error={error_msg}
        success={false}
        loc="Okay"
    />
{/if}
<div class="page-body">
    <div class="main-card">
        <div class="header-info">
            <input class="title-edit" placeholder="Title" type="text" bind:value={title}>
            <div class="source-info">
                <div class="custom-select">
                    <select name="" id="" bind:value={selected_source}>
                        {#each sources as source}
                            <option value={source.primary_id}>
                                {`${source.source.title}; ${source.source.full_citation.slice(0, 50) + (source.source.full_citation.length > 50 ? "..." : "")}`}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="page-range">
                    <input type="number" bind:value={start_page} placeholder="Start Page" class="page-input">
                    <hr>
                    <input type="number" bind:value={end_page} placeholder="End Page" class="page-input">
                </div>
            </div>
        </div>
        <div class="main-body-info">
            <textarea class="quote-edit" placeholder="[Paste Quotation Here]" bind:value={quote} />
            <div class="analysis-edit">
                <MarkdownEditor {carta} mode="tabs" bind:value={analysis} theme="github"/>
            </div>
        </div>
        <div class="actions">
            <a href="/project/notecards" class="cancel-btn">Cancel</a>
            <button class="submit-btn" on:click={handle_submit}>Submit</button>
        </div>
    </div>
</div>

<style>
   	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
		color: white;
	}



    .page-body {
        position: relative;
        padding: 20px;;
        max-width: 1200px;
        margin: 0 auto;
    }

    hr {
        width: 10px;
        height: 2px;
        background-color: white;
        border: none;
    }
    .main-card {
        display: grid;
        grid-template-rows: auto 1fr auto;
        position: relative;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        margin-top: 20px;
        background-color: #28313e;
        border: gray 2px solid;
        border-radius: 16px;
        overflow: hidden;
        color: #f5f5f5;
    }

    .header-info {
        padding: 20px;
        border-bottom: 1px solid var(--color-surface-mixed-500);
    }

    .title-edit {
        width: 100%;
        padding: 10px;
        font-size: 1.25rem;
        background-color: transparent;
        border: none;
        border-bottom: 2px solid var(--color-primary-400);
        color: #f5f5f5;
        outline: none;
        transition: border-bottom-color 0.3s;
    }

    .title-edit:focus {
        border-bottom-color: var(--color-primary-500);
    }

    .source-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }

    .custom-select {
        flex: 1;
        margin-right: 10px;
    }

    .custom-select select {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        background-color: #2c2c2c;
        color: #f5f5f5;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .page-range {
        display: flex;
        align-items: center;
    }

    .page-input {
        color-scheme: dark !important;
        width: 40px;
        padding: 10px;
        background-color: #2c2c2c;
        border: none;
        border-radius: 4px;
        color: #f5f5f5;
        text-align: center;
        margin: 0 5px;
        outline: none;
    }

    .main-body-info {
        display: flex;
        height: 100%;
        text-align: left;
        width: 100%;
        color: white;
    }

    textarea {
        padding: 20px;
        font-size: 1rem;
        background-color: transparent;
        border: none;
        height: 45vh;
        color: #f5f5f5;
        resize: none;
        outline: none;
    }

    .quote-edit {
        width: 50%;
        height: 45vh;
        border-right: 2px solid var(--color-surface-mixed-500);
    }

    .analysis-edit {
        width: 50%;
        color: white;
        flex: 1;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        padding: 20px;
        border-top: 1px solid var(--color-surface-mixed-500);
    }

    .cancel-btn, .submit-btn {
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        color: #f5f5f5;
        font-weight: bold;
        text-align: center;
        transition: background-color 0.3s;
    }

    .cancel-btn {
        background-color: #ff5f57;
        margin-right: 10px;
        font-size: 1rem;
    }

    .cancel-btn:hover {
        background-color: red;
    }

    .submit-btn {
        background-color: #28a745;
        font-size: 1rem;
        border: none;
        cursor: pointer;
    }

    .submit-btn:hover {
        background-color: #218838;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: var(--color-surface-mixed-300);
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-primary-400);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-primary-500);
    }
         
</style>
