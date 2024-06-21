<script lang="ts">
    import type Source from "../../lib/source";
    import SourceType from "../../lib/source_type";
    export let data: any = null;
    let source: Source;
    if (data) {
        source = {
            source_type: SourceType.JOURNAL,
            title: data.title != "" ? data.title : "",
            authors: data.author_name,
            series: "",
            series_num: null,
            volume: null,
            edition: null,
            publishing_location: "",
            publishing_company: "",
            publishing_year: null,
            doi: "",
            isbn: "",
            full_citation: "",
            student_id: "",
            pages: data.number_of_pages_median,
            url: data.url,
        };
    } else {
        source = {
            source_type: SourceType.JOURNAL,
            title: "",
            authors: [],
            series: "",
            series_num: null,
            volume: null,
            edition: null,
            publishing_location: "",
            publishing_company: "",
            publishing_year: null,
            doi: "",
            isbn: "",
            full_citation: "",
            student_id: "",
            pages: null,
            url: "",
        };
    }
</script>

<form>
    <div class="form-group">
        <label for="Title">Title</label>
        <input
            id="Title"
            type="text"
            placeholder="Source Title"
            bind:value={source.title}
        />
    </div>
    <div class="form-group">
        <label for="Author">Author</label>
        <input
            id="AuthorLastName"
            type="text"
            placeholder="Author Name"
            bind:value={source.authors}
        />
    </div>
    <div class="form-group">
        <label for="Publication">Publication</label>
        <input
            id="Publication"
            type="text"
            placeholder="Publication"
            bind:value={source.publishing_company}
        />
    </div>
    <div class="form-group">
        <label for="Volume">Volume</label>
        <input
            id="Volume"
            type="text"
            placeholder="Volume"
            bind:value={source.volume}
        />
    </div>
    <div class="form-group">
        <label for="Pages">Place</label>
        <input
            id="Pages"
            type="text"
            placeholder="Pages"
            bind:value={source.pages}
        />
    </div>
    <div class="form-group">
        <label for="Date">Date</label>
        <input
            id="Date"
            type="text"
            placeholder="Date"
            bind:value={source.publishing_year}
        />
    </div>
    <div class="form-group">
        <label for="Series">Series</label>
        <input
            id="Series"
            type="text"
            placeholder="Series Title"
            bind:value={source.series}
        />
    </div>
    <button
        id="ToggleManual"
        type="button"
        on:click={() => console.log("hello wrold")}>Auto-citation</button
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
        margin-right: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--color-surface-mixed-400);
    }

    input[type="text"] {
        width: 100%;
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
</style>
