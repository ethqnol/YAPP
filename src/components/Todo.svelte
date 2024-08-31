<script lang="ts">
    import type DatabaseTask from "../lib/task_database.ts";
    import Popup from "./Popup.svelte";

    let name: string = "";
    let description: string = "";
    let due_date: string = "";

    let task_add = false;
    let task_success = false;

    let error_msg: string = "";

    async function add_task() {
        const new_task = {
            name,
            description,
            due_date,
        };

        try {
            const response = await fetch("/api/todo/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_task),
            });

            task_add = true;
            if (response.ok) {
                task_success = true;
                window.location.reload();
            } else {
                error_msg = await response.text();
                task_success = false;
            }
        } catch (error) {
            console.error("Error:", error);
            task_add = true;
            if (error instanceof Error) error_msg = error.message;
            else {
                error_msg = "An unknown error occurred";
            }
            task_add = false;
        }
    }

    export let user_tasks: DatabaseTask[] = [];

    user_tasks.sort((a, b) => {
        if (!a.task.due_date && !b.task.due_date) {
            return a.task.creation_date - b.task.creation_date;
        }
        if (!a.task.due_date) {
            return -1;
        }
        if (!b.task.due_date) {
            return 1;
        }
        return b.task.due_date - a.task.due_date;
    });

    let done_tasks: DatabaseTask[] = [];
    let undone_tasks: DatabaseTask[] = [];
    user_tasks.forEach((task: DatabaseTask) => {
        if (task.task.completed) {
            done_tasks.push(task);
        } else {
            undone_tasks.push(task);
        }
    });

    async function complete_task(task_id: string) {
        complete(task_id);
        const response = await fetch(`/api/todo/complete/${task_id}`, {
            method: "GET",
        });

        if (!response.ok) uncomplete(task_id);
    }

    function complete(task_id: string) {
        const task = user_tasks.find((task) => task.primary_id === task_id);
        if (task) {
            task.task.completed = true;
            done_tasks.push(task);
            undone_tasks = undone_tasks.filter(
                (task) => task.primary_id !== task_id,
            );
        }
    }

    async function uncomplete_task(task_id: string) {
        uncomplete(task_id);
        const response = await fetch(`/api/todo/uncomplete/${task_id}`, {
            method: "GET",
        });
        if (!response.ok) complete(task_id);
    }

    function uncomplete(task_id: string) {
        const task = user_tasks.find((task) => task.primary_id === task_id);
        if (task) {
            task.task.completed = false;
            undone_tasks.push(task);
            done_tasks = done_tasks.filter(
                (task) => task.primary_id !== task_id,
            );
        }
    }

    async function delete_all_completed() {
        const response = await fetch(`/api/todo/delete`, {
            method: "GET",
        });
        if (response.ok) {
            done_tasks = [];
        }
    }
</script>

<div class="container">
    <h1>To-Do List</h1>
    <div>
        {#each undone_tasks as task}
            <form
                on:submit|preventDefault={async () => {
                    await complete_task(task.primary_id);
                }}
                class={(task.task.due_date != null &&
                new Date().getTime() >= task.task.due_date
                    ? "overdue task"
                    : "task not-overdue") +
                    (task.task.syllabus_id == "" ? "" : " syllabus")}
            >
                <div class="task-header">
                    <div class="task-title">
                        <button class="checkbox"></button>{task.task.name}
                    </div>
                </div>
                <div class="task-body">
                    <p>
                        {task.task.description.slice(0, 25) +
                            (task.task.description.length > 25 ? "..." : "")}
                    </p>
                </div>
                <div class="task-dates">
                    {#if task.task.due_date}
                        <p>
                            Due by: {new Date(
                                task.task.due_date,
                            ).toLocaleDateString()}
                        </p>
                    {:else}
                        <p>No due date</p>
                    {/if}
                </div>
            </form>
        {/each}
    </div>
    {#if task_add && !task_success}
        <Popup
            msg="Failed to add notecard."
            path="/project/notecards"
            success={false}
            error={error_msg}
            loc="Go To Notecards"
        />
    {/if}

    <form on:submit|preventDefault={add_task} id="add-task-form">
        <label>
            Task Name:
            <input type="text" name="name" required bind:value={name} />
        </label>
        <label>
            Description:
            <input
                type="text"
                name="description"
                required
                bind:value={description}
            />
        </label>
        <label>
            Due Date:
            <input type="date" name="due_date" bind:value={due_date} />
        </label>
        <label>
            <button type="submit">
                <svg
                    class="icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                Add
            </button>
        </label>
    </form>

    <h2>{done_tasks.length > 0 ? "Completed Tasks" : ""}</h2>
    <button class="delete-all-completed" on:click={delete_all_completed}>
        Permanently Delete All Completed Tasks
    </button>
    <div>
        {#each done_tasks as task}
            <form
                on:submit|preventDefault={async () => {
                    await uncomplete_task(task.primary_id);
                }}
                class="task-done"
            >
                <div class="task-header-done">
                    <div class="task-title-done">
                        <button class="checkbox-done"> ✔ </button>
                        <div id="task-name-done">{task.task.name}</div>
                    </div>
                </div>
                <div class="task-body-done">
                    <p>
                        {task.task.description.slice(0, 25) +
                            (task.task.description.length > 25 ? "..." : "")}
                    </p>
                </div>
                <div class="task-dates-done">
                    {#if task.task.due_date}
                        <p>
                            Due by: {new Date(
                                task.task.due_date,
                            ).toLocaleDateString()}
                        </p>
                    {:else}
                        <p>No due date</p>
                    {/if}
                </div>
            </form>
        {/each}
    </div>
</div>

<style>
    .container {
        max-width: 80%;
        width: 80%;
        margin-left: 10%;
        margin-top: 1.8rem;
    }

    h2 {
        margin-top: 5rem;
    }

    .delete-all-completed {
        background-color: var(--color-surface-mixed-400);
        border: none;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        color: white;
        font-weight: bold;
    }

    .delete-all-completed:hover {
        background-color: var(--color-surface-mixed-500);
    }

    #add-task-form {
        background-color: var(--color-surface-mixed-400);
        border-radius: 4px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    #add-task-form label {
        margin-bottom: 1rem;
        font-weight: bold;
        font-size: 1rem;
    }

    #add-task-form input[type="text"],
    #add-task-form input[type="date"] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    #add-task-form input[type="text"] {
        width: 90%;
    }

    #add-task-form input[type="date"] {
        width: 90%;
    }

    #add-task-form button {
        padding: 6px 20px;
        margin-top: 18px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    #add-task-form button .icon {
        margin-right: 10px;
    }

    @media only screen and (max-width: 800px) {
        #add-task-form,
        form {
            flex-direction: column;
            text-align: center;
            justify-content: center;
            align-items: center;
            gap: 0.2rem;
            padding: 0.1rem;
        }

        #add-task-form input,
        form input {
            width: 100%;
        }

        #add-task-form label,
        form label {
            width: 90%;
            margin-bottom: 0.2rem;
            align-items: center;
            justify-content: center;
        }

        #add-task-form button,
        form button {
            width: 100%;
            margin: 0.2rem;
        }
    }
    
    .syllabus {
        border: 2px solid var(--color-primary-200);
    }

    .task {
        background-color: #454750;
        border: 1px solid #8f9197;
        border-radius: 8px;
        padding: 16px;
        margin: 10px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .overdue {
        border: 2px solid red;
    }

    .not-overdue {
        border: 1px solid var(--color-surface-mixed-200);
    }

    .task-title {
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .task-body {
        flex: 1;
        margin-right: 20px;
    }

    .task-dates {
        font-size: 1em;
        color: #8f9197;
        text-align: right;
        margin-left: 20px;
    }

    .checkbox {
        width: 22px;
        height: 22px;
        background-color: transparent;
        border: 2px solid white;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
        transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .checkbox:hover {
        background-color: var(--color-primary-200);
    }

    .task {
        background-color: #454750;
        border: 1px solid #8f9197;
        border-radius: 8px;
        padding: 16px;
        margin: 10px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .checkbox-done {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: transparent;
        cursor: pointer;
        color: gray;
        margin-right: 10px;
        border: 2px solid gray;
        text-decoration: none;
        transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .checkbox-done:hover {
        background-color: lightgray;
    }

    .overdue {
        border: 2px solid red;
    }

    .not-overdue {
        border: 1px solid var(--color-surface-mixed-200);
    }

    .task-title-done {
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    #task-name-done {
        text-decoration: line-through;
    }

    .task-done {
        background-color: #3f3f3f;
        border: 1px solid #8f9197;
        border-radius: 8px;
        padding: 16px;
        margin: 10px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .task-body-done {
        flex: 1;
        margin-right: 20px;
        text-decoration: line-through;
    }

    .task-dates-done {
        font-size: 1em;
        color: #8f9197;
        text-align: right;
        margin-left: 20px;
        text-decoration: line-through;
    }
</style>
