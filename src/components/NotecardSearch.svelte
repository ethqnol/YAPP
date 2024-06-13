<script lang=ts>
    import Card from './Card.svelte';
    import type DatabaseNotecard from '../lib/notecard_database.ts';
    import { onMount } from 'svelte';
    export let params : string = "";
    async function search_cards() {
        const response = await fetch(`/api/notecards/search`);
        let notecards : DatabaseNotecard[] =  await response.json();
        console.log(notecards)
        return notecards;
    }
    let notecards_promise = search_cards();
</script>


<div class = "notecards-grid">
    {#await notecards_promise}
        <p>Loading...</p>
    {:then notecards}
        {#each notecards as notecard}
            <div>
                <Card
                    start_page={notecard.notecard.start_page} 
                    end_page={notecard.notecard.end_page} 
                    title = {notecard.notecard.title}  
                    quote = {notecard.notecard.quote} 
                    href = {`/project/notecards/edit/${notecard.primary_id}`}
                />
            </div> 
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
    
</div>



