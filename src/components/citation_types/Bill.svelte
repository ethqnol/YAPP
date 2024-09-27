<script lang="ts">
    import type Source from "../../lib/source";
    import type DatabaseSource from "../../lib/source_database";
    import SourceType from "../../lib/source_type";
    export let data: DatabaseSource | null = null;
    import type {Bill} from "../../lib/specific_sources/bill";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    
    
    const source_added = () => {
        dispatch("save", true);
    };

    const source_add_fail = () => {
        dispatch("save", false);
    };

    let source_id: string = data ? data.primary_id : "";
    let source: Source & { source_specific: Bill } = data
        ? data.source as Source & { source_specific: Bill }
        : {
            source_type: SourceType.BILL,
            full_citation: "",
            footnote_long: "",
            footnote_short: "",
            student_id: "",
            access_date: new Date().getTime(),
            source_specific: {
              title: "",
              sponsors: [""],
              bill_number: "",
              code: "",
              code_volume: null,
              section: null,
              date: null,
              code_pages: null,
              identifier: "",
            } as Bill
          };
    let bill_sponsors = (source.source_specific as Bill).sponsors;

    async function upload_source() {
        (source.source_specific as Bill).sponsors = bill_sponsors.filter((sponsor) => sponsor != "");
       
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
    
  
    

    function update_sponsor(e: any, index: number) {
        bill_sponsors = bill_sponsors.map((author, i) =>
            i === index ? e.target.value : author,
        );
    }

    function add_sponsor() {
        bill_sponsors = [...bill_sponsors, ""];

    }

    function subtract_sponsor(index: number) {
        if (bill_sponsors.length === 1) {
            return;
        }
        bill_sponsors.splice(index, 1);
        bill_sponsors = bill_sponsors;
    }
</script>

<form>
    <div class="form-group">
        <label for="Title">Title</label>
        <input
            id="Title"
            type="text"
            placeholder="Bill Title"
            bind:value={source.source_specific.title}
        />
    </div>
    <div class="form-group">
        <label for="Author">Sponsors(s)</label>
        {#each bill_sponsors as sponsor, i}
            <div class="author-input">
                <input
                    id="Author-{i}"
                    type="text"
                    placeholder="Author Name"
                    bind:value={bill_sponsors[i]}
                    on:input={(e) => update_sponsor(e, i)}
                />
                <button type="button" on:click={() => subtract_sponsor(i)}
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
        <button type="button" on:click={add_sponsor}>Add</button>
    </div>
    
    <div class="form-group">
        <label for="Bill Number">Bill Number</label>
        <input
            id="Bill Number"
            type="text"
            placeholder="Bill Number"
            bind:value={source.source_specific.bill_number}
        />
    </div>
    
    <div class="form-group">
        <label for="Code">Code</label>
        <input
            id="Code"
            type="text"
            placeholder="Code"
            bind:value={source.source_specific.code}
        />
    </div>
    
    <div class="form-group">
        <label for="Code Volume">Code Volume</label>
        <input
            id="Code Volume"
            type="number"
            placeholder="Code Volume"
            bind:value={source.source_specific.code_volume}
        />
    </div>
    
    <div class="form-group">
        <label for="Section">Section</label>
        <input
            id="Section"
            type="number"
            placeholder="Section"
            bind:value={source.source_specific.section}
        />
        
    </div>
    
    <div class="form-group">
        <label for="Code Pages">Code Pages</label>
        <input
            id="Code Pages"
            type="number"
            placeholder="Code Pages"
            bind:value={source.source_specific.code_pages}
        />
    </div>
    
    <div class="form-group">
        <label for="Identifier">Identifier</label>
        <input
            id="Identifier"
            type="text"
            placeholder="Identifier"
            bind:value={source.source_specific.identifier}
        />
        
    </div>
    
   
    
    <div class="form-group">
        <label for="Date">Date</label>
        <input
            id="Date"
            type="date"
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
