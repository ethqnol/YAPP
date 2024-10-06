<script lang="ts">
    import type Source from "../../lib/source";
    import type DatabaseSource from "../../lib/source_database";
    import SourceType from "../../lib/source_type";
    export let data: DatabaseSource | null = null;
    import type {Interview} from "../../lib/specific_sources/interview";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    
    
    const source_added = () => {
        dispatch("save", true);
    };

    const source_add_fail = () => {
        dispatch("save", false);
    };

    let source_id: string = data ? data.primary_id : "";
    let source: Source & { source_specific: Interview } = data
        ? data.source as Source & { source_specific: Interview }
        : {
            source_type: SourceType.BOOK,
            full_citation: "",
            footnote_long: "",
            footnote_short: "",
            student_id: "",
            access_date: new Date().getTime(),
            source_specific: {
              title: "",
              interviewers: [""],
              interviewees: [""],
              medium: "",
              date: null,
              identifier: "",
            } as Interview
          };
    let source_authors = (source.source_specific as Interview).interviewers;
    let source_editors = (source.source_specific as Interview).interviewees;

    async function upload_source() {
        (source.source_specific as Interview).interviewers = source_authors.filter((interviewer) => interviewer != "");
        (source.source_specific as Interview).interviewers = source_editors.filter((interviewee) => interviewee != "");
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
    
    
    function update_interviewer(e: any, index: number) {
        source.source_specific.interviewers = source.source_specific.interviewers.map((interviewer, i) =>
            i === index ? e.target.value : interviewer,
        );
    }

    function add_interviewer() {
        source.source_specific.interviewers = [...source.source_specific.interviewers, ""];

    }

    function subtract_interviewer(index: number) {
        if (source.source_specific.interviewers.length === 1) {
            return;
        }
        source.source_specific.interviewers.splice(index, 1);
        source.source_specific.interviewers = source.source_specific.interviewers;
    }
    
    
    
    

    function update_interviewee(e: any, index: number) {
        source.source_specific.interviewees = source.source_specific.interviewees.map((interviewee, i) =>
            i === index ? e.target.value : interviewee,
        );
    }

    function add_interviewee() {
        source.source_specific.interviewees = [...source.source_specific.interviewees, ""];

    }

    function subtract_interviewee(index: number) {
        if (source.source_specific.interviewees.length === 1) {
            return;
        }
        source.source_specific.interviewees.splice(index, 1);
        source.source_specific.interviewees = source.source_specific.interviewees;
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
        <label for="Interviewee">Interviewee(s)</label>
        {#each source_authors as interviewee, i}
            <div class="interviewee-input">
                <input
                    id="interviewee-{i}"
                    type="text"
                    placeholder="Interviewee Name"
                    bind:value={source.source_specific.interviewees[i]}
                    on:input={(e) => update_interviewee(e, i)}
                />
                <button type="button" on:click={() => subtract_interviewee(i)}
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
        <button type="button" on:click={add_interviewee}>Add</button>
    </div>
    
    <div class="form-group">
        <label for="Interviewer">Interviewer(s)</label>
        {#each source.source_specific.interviewers as interviewer, i}
            <div class="interviewer-input">
                <input
                    id="Interviewer-{i}"
                    type="text"
                    placeholder="Interviewer Name"
                    bind:value={source.source_specific.interviewers[i]}
                    on:input={(e) => update_interviewer(e, i)}
                />
                <button type="button" on:click={() => subtract_interviewer(i)}
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
        <button type="button" on:click={add_interviewer}>Add</button>
    </div>
    
    
    
    <div class="form-group">
        <label for="Medium">Medium</label>
        <input
            id="Medium"
            type="text"
            placeholder="Medium"
            bind:value={source.source_specific.medium}
        />
        
    </div>
    
    <div class="form-group">
        <label for="Date">Date</label>
        <input
            id="Date"
            type="number"
            placeholder="Year"
            bind:value={source.source_specific.date}
        />
    </div>
    <div class="form-group">
        <label for="Date">Date Accessed</label>
        <input
            id="Date"
            type="date"
            placeholder="Year"
            bind:value={source.access_date}
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

    .interviewer-input {
        width: 100%;
        display: flex;
        padding: 0;
    }

    .interviewer-input button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2rem;
        flex: 1;
        background-color: var(--color-primary-200);
    }

    .interviewer-input input {
        width: 100%;
    }

    .interviewer-input button:hover {
        background-color: var(--color-primary-100);
    }
</style>
