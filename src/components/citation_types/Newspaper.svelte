<script lang="ts">
    import type Source from "../../lib/source";
    import type DatabaseSource from "../../lib/source_database";
    import SourceType from "../../lib/source_type";
    export let data: DatabaseSource | null = null;
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    
    
    const source_added = () => {
        dispatch("save", true);
    };

    const source_add_fail = () => {
        dispatch("save", false);
    };

    let source_id: string = data ? data.primary_id : "";
    let source: Source = data
        ? data.source
        : {
              source_type: SourceType.NEWSPAPER,
              title: "",
              authors: [""],
              editors: [""],
              translators: [""],
              volume: null,
              edition: null,
              series: "",
              series_num: null,
              publishing_location: "",
              publishing_company: "",
              date: null,
              original_date: null,
              accessed: Date.now(),
              context: "",
              number_of_volumes: null,
              history: "",
              isbn: "",
              identifier: "",
              full_citation: "",
              footnote_long: "",
              footnote_short: "",
              student_id: "",
              pages: null,
          };
    let source_authors = source.authors;

    async function upload_source() {
        source.authors = source_authors.filter((author) => author != "");
        if (source_id != "") {
            let response = await fetch(`/api/sources/edit/${source_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(source),
            });
            if (response.ok) {
                console.log("Source updated");
            } else {
                console.log("Failed to update source");
            }
        } else {
            let response = await fetch(`/api/sources/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(source),
            });
            if (response.ok) {
                console.log("Source created");
                source_added();
            } else {
                console.log("Failed to create source");
                source_add_fail();
            }
        }
    }
    
    

    function update_author(e: any, index: number) {
        source_authors = source_authors.map((author, i) =>
            i === index ? e.target.value : author,
        );
    }

    function add_author() {
        source_authors = [...source_authors, ""];

    }

    function subtract_author(index: number) {
        if (source_authors.length === 1) {
            return;
        }
        source_authors.splice(index, 1);
        source_authors = source_authors;
    }
</script>

<form>
    <div class="form-group">
        <label for="Title">Article/Column Title</label>
        <input
            id="Title"
            type="text"
            placeholder="Article Title"
            bind:value={source.title}
        />
    </div>
    <div class="form-group">
        <label for="Author">Author(s)</label>
        {#each source_authors as author, i}
            <div class="author-input">
                <input
                    id="Author-{i}"
                    type="text"
                    placeholder="Author Name"
                    bind:value={source_authors[i]}
                    on:input={(e) => update_author(e, i)}
                />
                <button type="button" on:click={() => subtract_author(i)}
                    ><svg
                        class="w-[48px] h-[48px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            </div>
        {/each}
        <button type="button" on:click={add_author}>Add</button>
    </div>
    
    <div class="form-group">
        <label for="Publisher">Newspaper Name</label>
        <input
            id="Publisher"
            type="text"
            placeholder="Newspaper Name"
            bind:value={source.publishing_company}
        />
    </div>

    <div class="form-group">
        <label for="Date">Date</label>
        <input
            id="Date"
            type="date"
            placeholder="date"
            bind:value={source.date}
        />
    </div>
    <div class="form-group">
        <label for="Date">Date Accessed</label>
        <input
            id="Date"
            type="date"
            placeholder="Year"
            bind:value={source.accessed}
        />
    </div>
    <div class="form-group">
        <label for="URL">URL</label>
        <input
            id="URL or DOI"
            type="text"
            placeholder="URL"
            bind:value={source.identifier}
        />
    </div>
    <button id="ToggleManual" type="button" on:click={upload_source}
        >Auto-citation</button
    >
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
    }

    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--color-surface-mixed-600);
    }

    input {
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

    .author-input {
        width: 100%;
        display: flex;
        padding: 0;
    }

    .author-input button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2rem;
        flex: 1;
        background-color: var(--color-primary-200);
    }

    .author-input input {
        width: 100%;
    }

    .author-input button:hover {
        background-color: var(--color-primary-100);
    }
</style>
