<script>
    export let data;
    
    let author;
    
    if(data.author_name){
        author = data.author_name.join(' ');
    } else {
        author = "Unknown";
    }
    
    
</script>

<li class="link-card">
    <button>
        <div class="container">
            <img src={`https://covers.openlibrary.org/b/id/${data.cover_i}.jpg`} alt="book cover" />
            <div class="info-container">
                <h2>
                    {data.title}
                </h2>
                <h2>
                    {#if author && author.length > 20}
                        {author.slice(0, 50) + "..."}
                    {:else}
                        {author}
                    {/if}
                </h2>
            </div>

        </div>

    </button>
</li>

<style>
    img {
        max-height: 10vh;
        border-radius: 8px 8px 0 0;
    }
    .link-card {
        list-style: none;
        display: flex;
        padding: 1px;
        background-color: #23262d;
        background-image: none;
        background-size: 400%;
        border-radius: 7px;
        background-position: 100%;
        transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
    .link-card > button {
        width: 100%;
        text-decoration: none;
        line-height: 1.4;
        padding: calc(1.5rem - 1px);
        border-radius: 8px;
        color: white;
        background-color: #23262d;
        opacity: 0.8;
        border:none;
    }
    
    .container {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
    }
    
    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 1rem;
        padding: 0rem 1rem;
    }
    h2 {
        margin: 0;
        font-size: 1.25rem;
        transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    p {
        margin-top: 0.5rem;
        margin-bottom: 0;
    }
    .link-card:is(:hover, :focus-within) {
        background-position: 0;
        background-image: var(--accent-gradient);
    }
    .link-card:is(:hover, :focus-within) h2 {
        color: rgb(var(--accent-light));
    }
</style>
