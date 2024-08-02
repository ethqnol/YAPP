<script lang="ts">
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
                //window.location.reload();
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
</script>


{#if task_add && !task_success}
    <div class="overlay"></div>
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

<style>
    form {
        background-color: var(--color-surface-mixed-400);
        border-radius: 4px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    form label {
        margin-bottom: 1rem;
        font-weight: bold;
        font-size: 1rem;
    }

    form input[type="text"],
    form input[type="date"] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    form input[type="text"] {
        width: 90%;
    }

    form input[type="date"] {
        width: 90%;
    }

    form button {
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
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    form button .icon {
        margin-right: 10px;
    }
</style>
