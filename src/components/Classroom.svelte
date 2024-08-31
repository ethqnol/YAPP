<script lang="ts">
    import type DatabaseClass from "../lib/class_database";
    import type Class from "../lib/class";
    import Loading from "./Loading.svelte";
    
    export let classes: DatabaseClass[] = [];

    let add_class_popup = false;

    let class_name_new = "";
    let class_section_new = 1;
    let toggle_load = false;
    function toggle_popup() {
        add_class_popup = !add_class_popup;
    }

    async function add_class() {
        toggle_load = true;
        const new_class: Class = {
            class_name: class_name_new,
            teacher_id: "",
            teacher_name: "",
            section_number: class_section_new,
            class_code: "",
        };

        try {
            const response = await fetch("/api/classroom/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_class),
            });
            toggle_load = false;
            toggle_popup();
            location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<h1>Classes You Manage</h1>

{#if add_class_popup}
    {#if toggle_load}
        <Loading />
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions (because of reasons) -->
        <div class="popup-overlay" on:click={toggle_popup}>
            <div class="popup-content" on:click|stopPropagation>
                <h2>Add New Class</h2>
                <label>
                    Class Name:
                    <input
                        type="text"
                        bind:value={class_name_new}
                        placeholder="Enter class name"
                    />
                </label>
                <label>
                    Class Section:
                    <input
                        type="number"
                        bind:value={class_section_new}
                        placeholder="Enter section number"
                    />
                </label>
                <div class="popup-actions">
                    <button on:click={add_class}>Add Class</button>
                    <button class="cancel-button" on:click={toggle_popup}
                        >Cancel</button
                    >
                </div>
            </div>
        </div>
    {/if}
{/if}
<div class="header">
    <button class="add-class" on:click={toggle_popup}> + Add Class </button>
</div>

<div class="classroom-container">
    {#if classes.length > 0}
        {#each classes as class_item}
            <div class="class-box">
                <div class="class-box-content">
                    <h2>
                        {class_item.class.class_name} - Section {class_item
                            .class.section_number}
                    </h2>
                </div>
                <h4>
                    CODE: {class_item.class.class_code}
                </h4>
                <a
                    class="view-class"
                    href={`classroom/${class_item.primary_id}`}
                >
                    View Class
                </a>
            </div>
        {/each}
    {:else}
        <p class="no-classes">You haven't added any classes yet.</p>
    {/if}
</div>

<style>
    h1 {
        text-align: center;
        color: var(--color-primary-500);
        margin-top: 2rem;
        font-size: 2rem;
    }

    .header {
        display: flex;
        justify-content: center;
        margin: 1.5rem 0;
    }

    .add-class {
        background-color: var(--color-primary-400);
        color: white;
        border: none;
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }

    .add-class:hover {
        background-color: var(--color-primary-600);
    }

    .classroom-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .class-box {
        background-color: var(--color-surface-mixed-200);
        color: white;
        border-radius: 8px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 150px; /* Fixed height for uniform size */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out;
    }

    .class-box:hover {
        transform: translateY(-5px);
    }

    .class-box-content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .class-box h2 {
        font-size: 1.3rem;
        color: var(--color-primary-400);
        margin: 0;
    }

    .view-class {
        color: var(--color-primary-200);
        background-color: var(--color-surface-mixed-400);
        border: none;
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 4px;
        transition: background-color 0.3s ease-in-out;
        text-decoration: none;
    }

    .view-class:hover {
        background-color: var(--color-surface-mixed-500);
    }

    .no-classes {
        color: var(--color-primary-500);
        text-align: center;
        margin-top: 2rem;
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        .class-box {
            padding: 1rem;
            height: 180px; /* Adjust for smaller screens */
        }

        h1 {
            font-size: 1.5rem;
        }

        .add-class {
            padding: 8px 16px;
            font-size: 0.9rem;
        }

        .view-class {
            padding: 8px 16px;
        }
    }

    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .popup-content {
        background-color: var(--color-surface-mixed-200);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 90%;
        max-width: 400px;
        color: white;
    }

    .popup-content h2 {
        margin-top: 0;
        color: var(--color-primary-400);
    }

    .popup-content label {
        display: block;
        margin-bottom: 1rem;
    }

    .popup-content input {
        width: 96%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--color-surface-mixed-400);
        margin-top: 0.5rem;
    }

    .popup-actions {
        display: flex;
        justify-content: space-between;
    }

    .popup-actions button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .popup-actions .cancel-button {
        background-color: var(--color-surface-mixed-500);
    }

    .popup-actions .cancel-button:hover {
        background-color: var(--color-surface-mixed-600);
    }

    .popup-actions button:not(.cancel-button) {
        background-color: var(--color-primary-400);
        color: white;
    }

    .popup-actions button:not(.cancel-button):hover {
        background-color: var(--color-primary-600);
    }

   
</style>
