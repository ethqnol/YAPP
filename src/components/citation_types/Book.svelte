<script lang="ts">
import { onMount } from 'svelte';

    
import type Source from '../../lib/source';
export let data : any = null;
let source : Source;
if(data){
  source = {
    title: data.title != "" ? data.title : "",
    author_full: data.author_name.length == 0 ? data.author_name.join(" ") : "",
    author_last: data.author_name.length == 0 ? data.author_name[0].split(" ")[0] : "",
    author_mi: "",
    author_first: "",
    series: "",
    series_num: null,
    volume: null,
    edition: null,
    publishing_location: "",
    publishing_company: "",
    publishing_year: null,
    doi: "",
    isbn: "",
    full_citation: "",
  };
} else {
  source = {
    title: "",
    author_full: "",
    author_last: "",
    author_mi: "",
    author_first: "",
    series: "",
    series_num: null,
    volume: null,
    edition: null,
    publishing_location: "",
    publishing_company: "",
    publishing_year: null,
    doi: "",
    isbn: "",
    full_citation: "",
  };
}




</script>

<form>
    <div class="form-group">
        <label for="Title">Title</label>
        <input id="Title" type="text" placeholder="Source Title">
    </div>
    <div class="form-group">
        <label for="Author">Author</label>
        <input id="AuthorLastName" type="text" placeholder="Last Name" bind:value={source.author_first}>
        <input id="AuthorMiddleName" type="text" placeholder="Middle Name" bind:value={source.author_mi}>
        <input id="AuthorFirstName" type="text" placeholder="First Name" bind:value={source.author_last}>
    </div>
    <div class="form-group">
        <label for="Series">Series</label>
        <input id="Series" type="text" placeholder="Series Title" bind:value={source.series}>
    </div>
    <div class="form-group">
        <label for="SeriesNum">Series Number</label>
        <input id="SeriesNum" type="text" placeholder="Series Number"bind:value={source.series_num}>
    </div>
    <div class="form-group">
        <label for="Volume">Volume</label>
        <input id="Volume" type="text" placeholder="Volume" bind:value={source.volume}>
    </div>
    <div class="form-group">
        <label for="Edition">Edition</label>
        <input id="Edition" type="text" placeholder="Edition" bind:value={source.edition}>
    </div>
    <div class="form-group">
        <label for="Place">Place</label>
        <input id="Place" type="text" placeholder="Place" bind:value={source.publishing_location}>
    </div>
    <div class="form-group">
        <label for="Publisher">Publisher</label>
        <input id="Publisher" type="text" placeholder="Publisher" bind:value={source.publishing_company}>
    </div>
    <div class="form-group">
        <label for="Date">Date</label>
        <input id="Date" type="text" placeholder="Date" bind:value={source.publishing_year}>
    </div>
    <div class="form-group">
        <label for="ISBN">ISBN</label>
        <input id="ISBN" type="text" placeholder="ISBN" bind:value={source.isbn}>
    </div>
    <button id="ToggleManual" type="button" on:click={()=>console.log("hello wrold")}>Auto-citation</button>
</form>


<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--color-surface-mixed-400);
    }



    input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        color: #20232a;
        border: 1px solid var(--color-surface-mixed-400);
        border-radius: 4px;
        background-color: white;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: var(--color-surface-mixed-400);
    }

    button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        background-color: var(--color-surface-mixed-400);
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #21a1f1;
    }
</style>