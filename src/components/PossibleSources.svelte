<script>
    export let data;

    let author;
    let ISBN;
    let publisher;
    let PublishYear;
    let PublishingCity;

    let expanded = false;

    if (data.author_name) {
        author = data.author_name.join(" ");
    } else {
        author = "Unknown";
    }

    if (data.isbn) {
        ISBN = data.isbn[0];
    } else {
        ISBN = "Unknown";
    }

    if (data.publish_place) {
        PublishingCity = data.publish_place[0];
    } else {
        PublishingCity = "Unknown";
    }

    if (data.publish_date) {
        PublishYear = data.publish_date[0];
    } else {
        PublishYear = "Unknown";
    }

    if (data.publisher) {
        publisher = data.publisher[0];
    } else {
        publisher = "Unknown";
    }

    function expand() {
        expanded = !expanded;
        console.log("Toggled!");
    }
</script>

<li class="link-card">
    <button id="CurrentBook" on:click={expand}>
        <div class="container">
            <img
                src={`https://covers.openlibrary.org/b/id/${data.cover_i}.jpg`}
                alt="book cover"
            />
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
        {#if expanded}
            <div id="ToggleInfo">
                <table>
                    <th colspan="2">More Info</th>
                    <tr>
                        <td id="TopLeftRounding"> Author Name </td>
                        <td id="TopRightRounding">
                            {#if author && author.length > 20}
                                {author.slice(0, 50) + "..."}
                            {:else}
                                {author}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td> ISBN </td>
                        <td>
                            {#if ISBN && ISBN.length > 50}
                                {ISBN.slice(0, 50) + "..."}
                            {:else}
                                {ISBN}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td> Publishing Year </td>
                        <td>
                            {#if PublishYear && PublishYear.length > 20}
                                {PublishYear.slice(0, 50) + "..."}
                            {:else}
                                {PublishYear}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td> Publisher City </td>
                        <td>
                            {#if PublishingCity && PublishingCity.length > 20}
                                {PublishingCity.slice(0, 50) + "..."}
                            {:else}
                                {PublishingCity}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td id="BottomLeftRounding"> Publisher </td>
                        <td id="BottomRightRounding">
                            {#if publisher && publisher.length > 20}
                                {publisher.slice(0, 50) + "..."}
                            {:else}
                                {publisher}
                            {/if}
                        </td>
                    </tr>
                </table>
            </div>
        {/if}
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
        cursor: pointer;
        width: 100%;
        text-decoration: none;
        line-height: 1.4;
        padding: calc(1.5rem - 1px);
        border-radius: 8px;
        color: white;
        background-color: #23262d;
        opacity: 0.8;
        border: none;
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

    #ToggleInfo {
        width: 60%;
        position: relative;
        left: 20%;
        margin-top: 20px;
        text-align: center;
    }

    table {
        display: inline-block;
        width: 100%;
        border-collapse: collapse;
    }

    th {
        font-size: 1.5rem;
        height: 3rem;
    }

    td {
        text-align: center;
        vertical-align: center;
        width: 27.5vw;
        font-size: 1rem;
        border: none;
        padding: 5px;
    }

    tr:nth-child(even) {
        background-color: var(--color-surface-300);
    }

    tr:nth-child(odd) {
        background-color: var(--color-surface-400);
    }

    #TopLeftRounding {
        border-top-left-radius: 10px;
    }
    #TopRightRounding {
        border-top-right-radius: 10px;
    }

    #BottomLeftRounding {
        border-bottom-left-radius: 10px;
    }
    #BottomRightRounding {
        border-bottom-right-radius: 10px;
    }
</style>
