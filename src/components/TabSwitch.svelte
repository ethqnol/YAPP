<script lang="ts">
    import Book from "./citation_types/Book.svelte";
    import Case from "./citation_types/Case.svelte";
    import Magazine from "./citation_types/Magazine.svelte";
    import Journal from "./citation_types/Journal.svelte";
    import Website from "./citation_types/Website.svelte";
    import Letter from "./citation_types/Letter.svelte";
    import Manuscript from "./citation_types/Manuscript.svelte";
    import Newspaper from "./citation_types/Newspaper.svelte";
    
    import SourceSearch from "./SourceSearch.svelte";
    import Popup from "./Popup.svelte";
    let source_type: string = "0";
    let source_add_requested = false;
    let source_add_success = false;
    $: active_manual = true;
    let error_msg: string = "";
    function display_popup(event: any) {
        if (event.detail == true) {
            source_add_requested = true;
            source_add_success = true;
        } else {
            source_add_requested = true;
            source_add_success = false;
            error_msg = "An unknown error occurred";
        }
    }
</script>

<div id="Page">

    {#if source_add_requested && !source_add_success}
        <Popup
            msg="Failed to add source."
            path="/project/sources"
            success={false}
            error={error_msg}
            loc="Go To Sources"
        />
    {/if}
    <div class="tab-container">
        <button
            class="tab-button"
            class:tab-button-active={active_manual}
            on:click={() => (active_manual = true)}>Manual Citation</button
        >
        <button
            class="tab-button"
            class:tab-button-active={!active_manual}
            on:click={() => (active_manual = false)}>Source Search</button
        >
    </div>

    {#if active_manual}
        <div class="tab-content">
            <div class="form-group">
                <label for="SourceType">Source Type</label>
                <div class="custom-select">
                    <select id="SourceType" bind:value={source_type}>
                        <option value="0">Book</option>
                        <option value="1">Journal</option>
                        <option value="2">Website</option>
                        <option value="3">Newspaper</option>
                        <option value="4">Letter</option>
                        <option value="5">Case</option>
                        <option value="6">Manuscript</option>
                        <option value="7">Media</option>
                        <option value="8">Magazine</option>
                    </select>
                </div>
                {#if Number(source_type) == 0}
                    <Book on:save={display_popup} />
                {:else if Number(source_type) == 1}
                    <Journal on:save={display_popup} />
                {:else if Number(source_type) == 2}
                    <Website on:save={display_popup} />
                {:else if Number(source_type) == 3}
                    <Newspaper on:save={display_popup} />
                {:else if Number(source_type) == 4}
                    <Letter on:save={display_popup} />
                {:else if Number(source_type) == 5}
                    <Case on:save={display_popup} />
                {:else if Number(source_type) == 6}
                    <Manuscript on:save={display_popup} />
                {:else if Number(source_type) == 7}
                    <Newspaper on:save={display_popup} />
                {:else if Number(source_type) == 8}
                    <Magazine on:save={display_popup} />
                {:else}
                    <p>Unknown source type</p>
                {/if}
            </div>
        </div>
    {:else}
        <div class="tab-content">
            <SourceSearch on:save={display_popup} />
        </div>
    {/if}
</div>

<style>
    #Page {
        color: white;
        background-color: #20232a;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .tab-container {
        display: flex;
        border-bottom: 1px solid #ccc;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--color-surface-mixed-500);
    }

    .tab-button {
        background-color: inherit;
        border: none;
        outline: none;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1rem;
        color: white;
        padding: 1rem 6.25vw;
    }

    .tab-button:hover {
        background-color: #3b3f47;
    }

    .tab-button:click {
        background-color: #ffffff;
    }

    .tab-button-active {
        background-color: #3b3f47;
        border-bottom: 4px solid var(--color-primary-500);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        width: 35vw;
    }

    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--color-surface-mixed-400);
    }

    .custom-select {
        position: relative;
        width: 100%;
    }

    select {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        color: #20232a;
        border: 1px solid var(--color-surface-mixed-400);
        border-radius: 4px;
        background-color: white;
        appearance: none;
    }

    select:focus {
        outline: none;
        border-color: var(--color-surface-mixed-400);
    }

</style>
