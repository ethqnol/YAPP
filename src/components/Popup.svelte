<script lang=ts>
    export let msg : string;
    export let path : string;
    export let success : boolean;
    export let loc : string;
</script>

{#if success}
    <div class="popup success">
        <p>{msg}</p>
        <a href={path}>Go to {loc}</a>
    </div>
{:else}
    <div class="popup failure">
        <p>{msg}</p>
        <a href={path}>Go to {loc}</a>
    </div>
{/if}
<style>
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0.5rem;
        border-radius: 0.4rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        color: #fff;
        text-align: center;
        z-index: 1001;
        background-color: #4BB543;
        padding: 2rem;
        border: white 3px solid;
    }
 
    .popup.success {
        background-color: #28a745;
    }
 
    .popup.failure {
        background-color: #dc3545;
    }
 
    .popup p {
        margin: 0;
        font-size: 2rem;
        font-weight: 400;
        padding: 2rem;
    }
 
    .popup a {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        font-size: 1rem;
        text-decoration: none;
        transition: background-color 0.3s;
        transition: border 0.3s;
    }
 
    .popup.success a {
        background-color: #1e7e34;
    }
 
    .popup.failure a {
        background-color: #c82333;
    }
 
    .popup a:hover {
        background-color: #155724;
        border: 2px black solid;
    }
 
    .popup.failure a:hover {
        background-color: #bd2130;
    }

</style>