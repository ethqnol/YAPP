<script lang="ts">
    import Book from "./citation_types/Book.svelte";
    import Bill from "./citation_types/Bill.svelte";
    import BookSection from "./citation_types/BookSection.svelte";
    import Interview from "./citation_types/Interview.svelte";
    import Journal from "./citation_types/Journal.svelte";
    import Website from "./citation_types/Website.svelte";
    import Newspaper from "./citation_types/Newspaper.svelte";
    import Case from "./citation_types/Case.svelte";
    
    
    import SourceSearch from "./SourceSearch.svelte";
    import Popup from "./Popup.svelte";
    let source_type: string = "1";
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
                        <option value="0">Bill</option>
                        <option value="1">Book</option>
                        <option value="2">BookSection</option>
                        <option value="3">Case</option>
                        <option value="4">Conference Paper</option>
                        <option value="5">Interview</option>
                        <option value="6">Journal</option>
                        <option value="7">Magazine</option>
                        <option value="8">Media</option>
                        <option value="9">Newspaper</option>
                        <option value="10">Website</option>
                        <option value="11"> Other</option>
                    </select>
                </div>
                {#if Number(source_type) == 0}
                    <Bill on:save={display_popup} />
                {:else if Number(source_type) == 1}    
                    <Book on:save={display_popup} />
                    
                {:else if Number(source_type) == 2}
                    <BookSection on:save={display_popup} />
                    
                {:else if Number(source_type) == 3}
                    <Case on:save={display_popup} />
                    
                {:else if Number(source_type) == 4}
                    <p> unimplemented </p>
                    <!-- <ConferencePaper on:save={display_popup} /> -->
                {:else if Number(source_type) == 5}
                    <Interview on:save={display_popup} />
                    
                {:else if Number(source_type) == 6}
                    <Journal on:save={display_popup} />
                    
                {:else if Number(source_type) == 7}
                    <p> unimplemented </p>
                    <!-- <Magazine on:save={display_popup} /> -->
                {:else if Number(source_type) == 8}
                    <p> unimplemented </p>
                    <!-- <Media on:save={display_popup} /> -->
                {:else if Number(source_type) == 9}
                    <Newspaper on:save={display_popup} />
                    
                {:else if Number(source_type) == 10}
                    <Website on:save={display_popup} />
                    
                {:else if Number(source_type) == 11}
                    <p> unimplemented </p>
                    <!-- <Other on:save={display_popup} /> -->
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
