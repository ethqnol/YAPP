<script>
    import PossibleSources from "./PossibleSources.svelte";
    let bookInput = "";
    let book_data = [];

    async function searchBook(query) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const unwrapped = await response.json();
        let data = unwrapped.docs;
        //console.log(data)
        return data;
    }

    async function handleSearch() {
        book_data = await searchBook(bookInput);
    }
</script>

<svelte:head>
    <meta name="injected" content="true" />
</svelte:head>

<div id="Page">
    <div id="search">
        <h1>Source Search</h1>
        <div class="FormGroup" id="SearchBar">
            <input type="text" id="bookInput" placeholder="Enter an ISBN, DOI, or arXiv ID" bind:value={bookInput} />
            <button on:click={handleSearch}> Search </button>
        </div>
        <a id="ToggleManual" href="./sources/manual/">Manual Citation</a>
        <div id="searchResults"></div>
    </div>
    <!-- {#each book_data as book}
        <p> "hi" </p>
    {/each} -->
    {#await book_data}
        <p>Loading...</p>
    {:then book_data}
        {#if book_data.length > 0}
            {#each book_data as book}
                <PossibleSources data={book} />
            {/each}
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await} -->
</div>

<style>
    #Page {
        position: absolute;
        right: 0;
        width: calc(100vw - 2rem - 15vw);
        max-width: calc(100vw - 2rem - 15vw);
        text-align: center;
    }

    .FormGroup {
        height: 3em;
        padding: 1rem 0rem;
        width: calc(100vw - 2rem - 15vw);
        max-width: calc(100vw - 2rem - 15vw);
        text-align: center;
    }

    h1 {
        color: white;
        position: relative;
        top: 33.5vh;
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
        position: relative;
        top: 0.3vh;
        box-sizing: border-box;
        padding: 0.3rem;
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

    #SearchBar {
        position: absolute;
        top: 40vh;
    }

    #ToggleManual {
        position: relative;
        top: 39vh;
        background-color: var(--color-primary-400);
        transition: 0.2s;
        cursor: pointer;
        border: none;
        border-radius: 0.4rem;
        text-decoration: none;
        padding: 0.2rem;
    }

    #ToggleManual:hover {
        background-color: var(--color-primary-100);
        scale: 1.1;
        color: white;
    }

    #searchResults {
        position: relative;
        top: 40vh;
        color: white;
    }
</style>
