<script lang="ts">
    export let msg: string;
    export let error: string = "";
    export let path: string;
    export let success: boolean;
    export let loc: string;
</script>

{#if success}
    <div class="popup success">
        <p>{msg}</p>
        <a href={path}>{loc}</a>
    </div>
{:else}
    <div class="popup failure">
        <p>{msg}</p>
        {#if error != ""}
            <p>{error}</p>
        {/if}
        <a href={path}>{loc}</a>
    </div>
{/if}

<style>
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1.5rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        color: #fff;
        text-align: center;
        z-index: 1001;
        background-color: #4bb543;
        border: 3px solid #fff;
        max-height: 70vh;
        overflow-y: auto;
    }

    .popup.success {
        background-color: #28a745;
    }

    .popup.failure {
        background-color: #dc3545;
    }

    .popup p {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 500;
    }

    .popup a {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 1rem;
        text-decoration: none;
        transition:
            background-color 0.3s ease,
            border 0.3s ease;
    }

    .popup.success a {
        background-color: #1e7e34;
    }

    .popup.failure a {
        background-color: #c82333;
    }

    .popup a:hover {
        background-color: #155724;
        border: 2px solid #000;
    }

    .popup.failure a:hover {
        background-color: #bd2130;
    }
</style>
