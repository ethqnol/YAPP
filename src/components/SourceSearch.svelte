<script lang="ts">
    import PossibleSources from "./PossibleSources.svelte";
    let book_input = "";
    let book_data: any[] = [];
    let loading = false;
    let query_sent = false;
    async function search_book(query: string) {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=*&limit=8`,
        );
        const unwrapped = await response.json();
        let data = unwrapped.docs;

        return data;
    }



    async function handle_search() {
        loading = true;
        query_sent = true;
        book_input = book_input.trim();
        book_data = await search_book(book_input);
        console.log(book_data)
        loading = false;
    }
</script>

<svelte:head>
    <meta name="injected" content="true" />
</svelte:head>

<div id="search">
    <div id="search-area">
        <h1>Source Search</h1>
        <form
            class="FormGroup"
            id="SearchBar"
            on:submit|preventDefault={handle_search}
        >
            <input
                type="text"
                id="book_input"
                placeholder="Enter an ISBN or Book Title"
                bind:value={book_input}
            />
            
            <button on:click={handle_search}> Search </button>
        </form>
        <span><i>DOI and ArXiv support coming soon...</i></span>
    </div>

    <div id="searchResults">
        {#if loading}
            <p id="loading">
                Loading
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </p>
        {:else if query_sent == false}
            <p>Nothing to see here... yet.</p>
        {:else if book_data.length > 0}
            {#each book_data as book}
                <PossibleSources data={book} on:save />
            {/each}
        {:else}
            <p>No Books Found</p>
        {/if}
    </div>
</div>

<style>
    #loading {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }

    @keyframes dotFlashing {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 0;
        }
    }

    .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        border-radius: 50%;
        background-color: white;
        animation: dotFlashing 1.8s infinite both;
        color: white;
    }

    .dot:nth-child(1) {
        animation-delay: 0s;
    }

    .dot:nth-child(2) {
        animation-delay: 0.1s;
    }
    

    .dot:nth-child(3) {
        animation-delay: 0.2s;
    }

    #search-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--color-surface-200);
        border-radius: 0.4rem;
        padding: 1rem;
        width: 80vw;
    }

    #search {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        overflow-x: hidden;
    }
    
    span {
        color: white;
        font-size: 0.8rem;
        opacity: 0.5;
    }

    .FormGroup {
        height: 3em;
        padding: 1rem 0rem;
        width: 100%;
        max-width: 100%;
        text-align: center;
        align-self: center;
    }

    h1 {
        color: white;
    }

    input[type="text"] {
        background-color: transparent;
        border: solid 1px grey;
        height: 100%;
        border-radius: 5px;
        transition: 0.2s;
        color: grey;
        padding: 0.5em;
        width: 30%;
        font-size: medium;
        box-sizing: border-box;
        padding: 0.3rem;
        top: 0.3vh;
    }

    input[type="text"]:focus {
        scale: 1.02;
        border: white;
        color: white;
        margin-right: 0.7rem;
    }

    button {
        background-color: var(--color-primary-400);
        transition: 0.2s;
        cursor: pointer;
        height: 100%;
        width: 5%;
        border: none;
        border-radius: 5px;
    }

    button:hover {
        background-color: var(--color-primary-100);
        scale: 1.1;
        color: white;
        margin-left: 0.3rem;
    }

    button:active {
        background-color: var(--color-primary-200);
        scale: 1.1;
        color: white;
        margin-left: 0.3rem;
    }

    #searchResults {
        width: 95%;
        color: white;
        padding: 1rem;
        border-radius: 0.4rem;
        height: 100%;
        gap: 1rem;
    }

    p {
        color: white;
        font-weight: 900;
        font-size: 1.5rem;
    }
</style>
