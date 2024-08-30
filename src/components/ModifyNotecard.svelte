<script lang="ts">
    import type DatabaseNotecard from "../lib/notecard_database.ts";
    import Popup from "./Popup.svelte";
    import type DatabaseSource from "../lib/source_database.ts";
    export let notecard: DatabaseNotecard | null = null;
    export let sources: DatabaseSource[] = [];

    let notecard_add = false;
    let notecard_success = false;

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
            if (response.ok) {
                notecard_success = true;
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
</script>

<div class = 'page-body'>
    <div class = 'main-card'>
        <div class = 'header-info'>
            <input class = 'title-edit' placeholder = "Title" type = 'text' bind:value={title}>
            <div class="source-info">
                <div class = 'custom-select'>
                    <select name="" id="">
                        {#each sources as source}
                            <option value={source.primary_id}
                                >{`${source.source.title}; ${source.source.full_citation.slice(0, 50) + (source.source.full_citation.length > 50 ? "..." : "")}`}</option
                            >
                        {/each}
                    </select>
                </div>
                <div class = 'page-range'>
                    <input type="text" bind:value={start_page} placeholder='Start Page' class ='page-input'>
                    -
                    <input type="text" bind:value={end_page} placeholder='End Page' class ='page-input'>
                </div>
            </div>
        </div>
        <div class = 'main-body-info'>
            <textarea class="quote-edit" placeholder="[Paste Quotation Here]" bind:value={quote} />
            <textarea class="analysis-edit" placeholder="[Write Analysis Here]" bind:value={analysis}/>
        </div>
    </div>
</div>
<style>

    .page-body {
        position: absolute;
        left: var(--sidebar-width);
        width: calc(100vw - var(--sidebar-width));
        text-align: center;
    }

    .main-card {
        display: grid;
        position: absolute;
        text-align: center;
        box-shadow: inset 0 0 0 8px rgb(130, 130, 130);
        top: 10vh;
        height: 80vh;
        width: 80%;
        left: 10%;
        background-color: var(--color-surface-mixed-300);
        border-radius: 16px;
        color: white;
    }

    .header-info {
        width: 100%; 
        height: 31%;
        color: white;
        border-radius: 4px;
        border-bottom: 8px rgb(130, 130, 130) solid;
    }

    textarea {
        color: white;
        padding: 15px;
        height: calc(100% - 31%);
        resize: none;
        font-size: large;
    }

    .title-edit {
        width: 85%;
        margin-top: 2%;
        font-size: x-large;
        display: inline-block;
        text-align: center;
        background-color: transparent;
        margin-bottom: 0;
        border-radius: 7px;
        border: none;
        color: white;
        font-weight: bold
    }

    .source-info {
        display: inline-flex;
        width: auto;
        padding: 0;
        margin-top: 1.5rem;
    }

    .custom-select {
        width: 85%;
        display: inline;
        height: 1.5rem;
        margin-top: 0;
        padding: 0;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 1rem;
    }

    .custom-select select{
        appearance: none;
        text-align: center;
        width: auto;
        max-width: 90%;
        margin: none;
        padding: 0;
        background-color: transparent;
        border: none;
        border-radius: 0.25rem;
        color: white;
        cursor: pointer;
        text-align: center;
    }

    .page-range {
        display: flex;
        flex-wrap: nowrap;
        height: 1.3rem;
        padding: 0px;
    }

    .page-input {
        background-color: transparent;
        border: solid rgb(130, 130, 130) 2px;
        border-radius: 7px;
        color: white;
        text-align: center;
        padding: 0px;
        width: auto;
    }
    .quote-edit {
        position: absolute;
        left: 0;
        width: 65%;
        height: 81%;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 0 0 0 16px;
        border: none;
        border-right: solid rgb(130, 130, 130) 10px;
        background-color: transparent;
        top: 19%;
    }

    .analysis-edit {
        position: absolute;
        left: 65%;
        width: 35%;
        height: 81%;
        border-radius: 0 0 16px 0;
        border: none;
        padding: 1rem;
        box-sizing: border-box;
        background-color: transparent;
        top: 19%;
    }
</style>