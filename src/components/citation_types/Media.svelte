<script lang="ts">
    import type Source from "../../lib/source";
    import type DatabaseSource from "../../lib/source_database";
    import SourceType from "../../lib/source_type";
    export let data: DatabaseSource | null = null;
    import type {Media} from "../../lib/specific_sources/media";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    
    
    const source_added = () => {
        dispatch("save", true);
    };

    const source_add_fail = () => {
        dispatch("save", false);
    };

    let source_id: string = data ? data.primary_id : "";
    let source: Source & { source_specific: Media } = data
        ? data.source as Source & { source_specific: Media }
        : {
            source_type: SourceType.MEDIA,
            full_citation: "",
            footnote_long: "",
            footnote_short: "",
            student_id: "",
            access_date: new Date().getTime(),
            source_specific: {
              title: "",
              directors: [""],
              episode_number: "",
              episode_title: "",
              season_number: "",
              distributor: "",
              location: "",
              release_year: null,
              identifier: "",
            } as Media
          };
    let source_authors = (source.source_specific as Media).directors;
    async function upload_source() {
        (source.source_specific as Media).directors = source.source_specific .directors.filter((director) => director != "");
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
    
    
    function update_director(e: any, index: number) {
        source.source_specific.directors = source.source_specific.directors.map((director, i) =>
            i === index ? e.target.value : director,
        );
    }

    function add_director() {
        source.source_specific.directors = [...source.source_specific.directors, ""];

    }

    function subtract_director(index: number) {
        if (source.source_specific.directors.length === 1) {
            return;
        }
        source.source_specific.directors.splice(index, 1);
        source.source_specific.directors = source.source_specific.directors;
    }
</script>

<form>
    <div class="form-group">
        <label for="Title">Title</label>
        <input
            id="Title"
            type="text"
            placeholder="Book Title"
            bind:value={source.source_specific.title}
        />
    </div>
    <div class="form-group">
        <label for="Director">Director(s)</label>
        {#each source.source_specific.directors as diector, i}
            <div class="director-input">
                <input
                    id="Director-{i}"
                    type="text"
                    placeholder="Director Name"
                    bind:value={source.source_specific.directors[i]}
                    on:input={(e) => update_director(e, i)}
                />
                <button type="button" on:click={() => subtract_director(i)}
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
        <button type="button" on:click={add_director}>Add</button>
    </div>
    
    <div class="form-group">
        <label for="Episode-Number">Episode Number</label>
        <input
            id="Episode_Number"
            type="text"
            placeholder="Episode Number"
            bind:value={source.source_specific.episode_number}
        />
    
    </div>
    
    <div class="form-group">
        <label for="Season-Number">Season Number</label>
        <input
            id="Season-Number"
            type="text"
            placeholder="Season #"
            bind:value={source.source_specific.season_number}
        />
    </div>

    <div class="form-group">
        <label for="Episode-Title">Episode Title</label>
        <input
            id="Episode-Title"
            type="text"
            placeholder="Episode Title"
            bind:value={source.source_specific.episode_title}
        />
    </div>
    
    <div class="form-group">
        <label for="Distributor">Distributor</label>
        <input
            id="Distributor"
            type="text"
            placeholder="Distributor"
            bind:value={source.source_specific.distributor}
        />
        
    </div>
    
    <div class="form-group">
        <label for="Location">Location</label>
        <input
            id="Location"
            type="text"
            placeholder="Location"
            bind:value={source.source_specific.location}
        />
    </div>
    
    <div class="form-group">
        <label for="Release-Year">Release Year</label>
        <input
            id="Release-Year"
            type="number"
            placeholder="Year"
            bind:value={source.source_specific.release_year}
        />
    </div>
    <div class="form-group">
        <label for="DOI">Identifier (DOI or URL)</label>
        <input
            id="DOI"
            type="text"
            placeholder="DOI or URL"
            bind:value={source.source_specific.identifier}
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

    .director-input {
        width: 100%;
        display: flex;
        padding: 0;
    }

    .director-input button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2rem;
        flex: 1;
        background-color: var(--color-primary-200);
    }

    .director-input input {
        width: 100%;
    }

    .director-input button:hover {
        background-color: var(--color-primary-100);
    }
</style>
