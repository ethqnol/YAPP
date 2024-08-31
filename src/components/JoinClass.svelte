<script lang="ts">
    let show_join_prompt = false;
    let class_code = "";

    function toggle_join_prompt() {
        show_join_prompt = !show_join_prompt;
    }

    async function join_class() {
        if (class_code) {
            try {
                const response = await fetch("/api/classroom/join", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ class_code }),
                });
                toggle_join_prompt();
                location.reload();
            } catch(error) {
                console.error("Error:", error);
            }
            
        }
    }
</script>

<button class="join-class-button" on:click={toggle_join_prompt}>
    Join Class
</button>

{#if show_join_prompt}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions (because of reasons) -->
    <div class="popup-overlay" on:click={toggle_join_prompt}>
        <div class="popup-content" on:click|stopPropagation>
            <h2>Join a Class</h2>
            <label>
                Class Code:
                <input
                    type="text"
                    bind:value={class_code}
                    placeholder="Enter class code"
                />
            </label>
            <div class="popup-actions">
                <button on:click={join_class}>Join</button>
                <button class="cancel-button" on:click={toggle_join_prompt}
                    >Cancel</button
                >
            </div>
        </div>
    </div>
{/if}

<style>

    .join-class-button {
        display: block;
        margin: 2rem auto;
        padding: 10px 20px;
        background-color: var(--color-primary-400);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease-in-out;
    }

    .join-class-button:hover {
        background-color: var(--color-primary-600);
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
