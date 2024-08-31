<script lang="ts">
    import type Source from "../lib/source";
    import SourceType from "../lib/source_type";
    import Loading from "./Loading.svelte";
    import { createEventDispatcher } from "svelte";
    export let data: any;
    let author: string;
    let isbn: string;
    let publisher: string;
    let publish_year: string;
    let publishing_city: string;

    const dispatch = createEventDispatcher();

    let expanded = false;

    if (data.author_name) {
        author = data.author_name.join(" ");
    } else {
        author = "Unknown";
    }

    if (data.isbn) {
        isbn = data.isbn[0];
    } else {
        isbn = "Unknown";
    }

    if (data.publish_place) {
        publishing_city = data.publish_place[0];
    } else {
        publishing_city = "Unknown";
    }

    if (data.publish_date) {
        publish_year = data.publish_year[0];
    } else {
        publish_year = "Unknown";
    }

    if (data.publisher) {
        publisher = data.publisher[0];
    } else {
        publisher = "Unknown";
    }
    let loading = false;
    function expand() {
        expanded = !expanded;
    }

    const source_added = () => {
        window.location.href = "/project/sources";
    };

    const source_add_fail = () => {
        dispatch("save", false);
    };

    async function generate_citation() {
        loading = true;
        let source: Source = {
            source_type: SourceType.BOOK,
            title: data.title,
            authors: data.author_name,
            series: "",
            series_num: null,
            volume: null,
            edition: 1,
            publishing_location: publishing_city,
            publishing_company: publisher,
            publishing_year: parseInt(publish_year),
            doi: "",
            isbn: isbn,
            full_citation: "",
            student_id: "",
            footnote_long: "",
            footnote_short: "",
            pages: null,
            url: "",
        };

        const res = await fetch("/api/sources/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(source),
        });
        loading = false;
        if (res.ok) {
            source_added();
        } else {
            source_add_fail();
        }
    }
</script>
    {#if loading}
<Loading />
{/if}
<li class="link-card">
    <button class="current-book" on:click={expand}>
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
                            {#if isbn && isbn.length > 50}
                                {isbn.slice(0, 50) + "..."}
                            {:else}
                                {isbn}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td> Publishing Year </td>
                        <td>
                            {#if publish_year && publish_year.length > 20}
                                {publish_year.slice(0, 50) + "..."}
                            {:else}
                                {publish_year}
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td> Publisher City </td>
                        <td>
                            {#if publishing_city && publishing_city.length > 20}
                                {publishing_city.slice(0, 50) + "..."}
                            {:else}
                                {publishing_city}
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
    <button class="cite-button" on:click={generate_citation}> Cite! </button>
</li>

<style>
    img {
        max-height: 10vh;
        border-radius: 8px 8px 0 0;
    }

    .link-card {
        margin: 1rem;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 2px;
        background-color: #23262d;
        background-image: none;
        background-size: 400%;
        border-radius: 8px;
        background-position: 100%;
        transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
    .current-book {
        cursor: pointer;
        width: 100%;
        text-decoration: none;
        line-height: 1.4;
        padding: calc(1.5rem - 4px);
        border-radius: 8px 8px 0px 0px;
        color: white;
        background-color: #23262d;
        border: none;
    }

    .container {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
    }
    .cite-button {
        background-color: var(--color-surface-mixed-200);
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.8rem 1rem;
        border-radius: 0 0 8px 8px;
        margin-top: 0.1rem;
    }

    .cite-button:hover {
        background-color: var(--color-primary-100);
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
