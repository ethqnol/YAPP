<script>
    import PossibleSources from "./PossibleSources.svelte";
    let bookInput = "";
    let book_data = [];
    let loading = false;
    let querySent = false;
    async function searchBook(query) {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=*&limit=8`,
        );
        const unwrapped = await response.json();
        let data = unwrapped.docs;
        console.log(data);
        return data;
    }

    async function handleSearch() {
        loading = true;
        querySent = true;
        book_data = await searchBook(bookInput);
        loading = false;
    }
</script>

<svelte:head>
    <meta name="injected" content="true" />
</svelte:head>

<div id="search">
    <div id="search-area">
        <h1>Source Search</h1>
        <form class="FormGroup" id="SearchBar" on:submit|preventDefault={handleSearch}>
            <input
                type="text"
                id="bookInput"
                placeholder="Enter an ISBN, DOI, or arXiv ID"
                bind:value={bookInput}
            />
            <button on:click={handleSearch}> Search </button>
        </form>
    </div>

    <div id="searchResults">
        {#if loading}
            <p id="loading">
                Loading
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </p>
        {:else if querySent == false}
            <p>
                Nothing to see here... yet.
            </p>
        {:else if book_data.length > 0}
            {#each book_data as book}
                <PossibleSources data={book} />
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
        width: 95%;
        padding: 1rem;
    }

    #search {
        width: calc(100vw - 2rem - 12vw);
        max-width: calc(100vw - 2rem - 12vw);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        overflow-x: hidden;
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
        position: relative;
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
