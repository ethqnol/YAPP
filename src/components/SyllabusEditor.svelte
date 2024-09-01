<script lang="ts">
    import type Task from "../lib/task";
    import Popup from "../components/Popup.svelte";
    import Loading from "../components/Loading.svelte";
    import type DatabaseSyllabus from "../lib/syllabus_database";
    export let syllabus: DatabaseSyllabus[] = [];
    export let class_id: string;
    export let class_size: number;
    let error_msg = "";
    let loading = false;
    let task_adding = false;

    function toggle_task_adding() {
        task_adding = !task_adding;
    }
    let new_item: Task = {
        student_id: "",
        name: "",
        description: "",
        due_date: null,
        creation_date: new Date().getTime(),
        syllabus_id: "",
        completed: false,
    };

    async function add_item() {
        task_adding = true;
        loading = true;
        const response = await fetch("/api/syllabus/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              task: new_item,
              class_id: class_id,
            }),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            error_msg = await response.text();
            task_adding = false;
        }
    }

    async function delete_syllabus_item(primary_id: string) {
        loading = true;
        const response = await fetch(`/api/syllabus/delete/${primary_id}`, {
            method: "GET",
        });

        if (response.ok) {
            loading = false;
            syllabus = syllabus.filter(
                (task) => task.primary_id !== primary_id,
            );
        } else {
            error_msg = "Failed to delete syllabus item";
        }
    }
</script>
{#if loading}
    <Loading />
{/if}

{#if error_msg !== "" && task_adding}
    <Popup
        msg="Failed to add syllabus task."
        path="/classroom"
        success={false}
        error={error_msg}
        loc="Okay"
    />
{:else if error_msg != ""}
    <Popup
        msg="Failed to delete task."
        path="/classroom"
        success={false}
        error={error_msg}
        loc="Okay"
    />
{/if}

{#if task_adding}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions (because of reasons) -->
    <div class="popup-overlay" on:click={toggle_task_adding}>
        <div class="popup-content" on:click|stopPropagation>
            <h2>Add New Task</h2>
            <label>
                Task Name:
                <input
                    type="text"
                    bind:value={new_item.name}
                    placeholder="Enter task name"
                    required
                />
            </label>
            <label>
                Task Description:
                <input
                    type="text"
                    required
                    bind:value={new_item.description}
                    placeholder="Enter task description"
                />
            </label>
            <label>
                Due Date:
                <input type="date" required bind:value={new_item.due_date} />
            </label>
            <div class="popup-actions">
                <button on:click={add_item}>Add Task</button>
                <button class="cancel-button" on:click={toggle_task_adding}>Cancel</button>
            </div>
        </div>
    </div>
{/if}
<div class="container">
    <button class="add-button" on:click={toggle_task_adding}>Add Syllabus Item</button>
    <table>
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th> # Of Completions </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each syllabus as task (task.primary_id)}
                <tr>
                    <td>{task.syllabus.name}</td>
                    <td>{task.syllabus.description}</td>
                    <td>{task.syllabus.due_date}</td>
                    <td>{task.syllabus.completed_num+"/"+class_size}</td>
                    <td><button class="delete-button" on:click={() => delete_syllabus_item(task.primary_id)}>Delete</button></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
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

    .container {
        margin: 2rem auto;
        max-width: 900px;
        padding: 2rem;
        background-color: var(--color-surface-300);
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .add-button {
        background-color: var(--color-primary-500);
        border: none;
        color: white;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        display: inline-block;
        transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .add-button:hover {
        background-color: var(--color-primary-600);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        background-color: var(--color-surface-mixed-300);
        border-radius: 8px;
        overflow: hidden;
        
    }

    thead {
        background-color: var(--color-primary-500);
        color: white;
    }

    th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid var(--color-surface-400);
        border-left: 2px solid var(--color-surface-400);
        border-right: 2px solid var(--color-surface-400);
    }


    .delete-button {
        background-color: red;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s, transform 0.2s;
    }

    .delete-button:hover {
        background-color: lightred;
        transform: scale(1.02);
    }

</style>