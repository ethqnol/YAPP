<script lang="ts">
    import type DatabaseUsers from "../lib/user_database";

    export let user_data: DatabaseUsers;
    
    const allow_teacher_view_copy = user_data.user.allow_teacher_view != undefined ? user_data.user.allow_teacher_view : false;
    const allow_public_streak_record_copy = user_data.user.allow_public_streak_record != undefined ? user_data.user.allow_public_streak_record : false;
    const allow_public_progress_view_copy = user_data.user.allow_public_progress_view != undefined ? user_data.user.allow_public_progress_view : false;
    const allow_public_awards_record_copy = user_data.user.allow_public_awards_record != undefined ? user_data.user.allow_public_awards_record : false;
    
    let allow_teacher_view = user_data.user.allow_teacher_view != undefined ? user_data.user.allow_teacher_view : false;
    let allow_public_streak_record = user_data.user.allow_public_streak_record != undefined ? user_data.user.allow_public_streak_record : false;
    let allow_public_progress_view = user_data.user.allow_public_progress_view != undefined ? user_data.user.allow_public_progress_view : false;
    let allow_public_awards_record = user_data.user.allow_public_awards_record != undefined ? user_data.user.allow_public_awards_record : false;
    $: changed = false;

    function change_check() {
        if (
            allow_teacher_view == allow_teacher_view_copy &&
            allow_public_streak_record ==
                allow_public_streak_record_copy &&
            allow_public_progress_view ==
                allow_public_progress_view_copy &&
            allow_public_awards_record ==
                allow_public_awards_record_copy
        ) {
            changed = false;
        } else {
            changed = true;
        }
    }
</script>

<div id="settings-section">
    <h2>Settings</h2>
    <form on:change={change_check}>
        <label class="toggle">
            <input
                type="checkbox"
                id="toggle-streak"
                bind:checked={allow_public_streak_record}
            />
            <span class="slider"></span>
            <span class="toggle-label">Toggle Public Streak</span>
        </label>
        <label class="toggle">
            <input
                type="checkbox"
                id="allow-teacher-view"
                bind:checked={allow_teacher_view}
            />
            <span class="slider"></span>
            <span class="toggle-label">Allow Teacher to View Project</span>
        </label>
        <label class="toggle">
            <input
                type="checkbox"
                id="toggle-badges"
                bind:checked={allow_public_awards_record}
            />
            <span class="slider"></span>
            <span class="toggle-label"
                >Allow Others To View Badges/Achievements</span
            >
        </label>
        <label class="toggle">
            <input
                type="checkbox"
                id="allow-student-view"
                bind:checked={allow_public_progress_view}
            />
            <span class="slider"></span>
            <span class="toggle-label"
                >Allow Other Students to See Your Progress</span
            >
        </label>
    </form>
    {#if changed}
        <button
            class="save-button"
            on:click={() => {
                changed = false;
                fetch("/api/settings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        allow_teacher_view,
                        allow_public_streak_record,
                        allow_public_progress_view,
                        allow_public_awards_record,
                    }),
                });
            }}
        >
            Save Changes
        </button>
    {/if}
</div>

<style>
    
    .save-button {
        background-color: var(--color-primary-200);
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .save-button:hover {
        background-color: var(--color-primary-300);
    }
    
    #settings-section {
        background-color: var(--color-surface-300);
        padding: 1.5rem;
        border-radius: 8px;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--color-primary-400);
    }

    .toggle {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .toggle input {
        display: none;
    }

    .slider {
        width: 40px;
        height: 20px;
        background-color: var(--color-surface-200);
        border-radius: 10px;
        position: relative;
        transition: background-color 0.3s;
        cursor: pointer;
    }

    .slider::before {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 50%;
        top: 2px;
        left: 2px;
        transition: transform 0.3s;
    }

    input:checked + .slider {
        background-color: var(--color-primary-400);
    }

    input:checked + .slider::before {
        transform: translateX(20px);
    }

    .toggle-label {
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-color);
    }
</style>
