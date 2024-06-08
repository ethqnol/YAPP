<script lang="ts">
import Book from './citation_types/Book.svelte'
import SourceSearch from './SourceSearch.svelte'

$: active_manual = true;

</script>

<div id="Page">   
    <div class="tab-container">
        <button class="tab-button" on:click={()=>active_manual = true}>Manual Citation</button>
       <button class="tab-button" on:click={()=>active_manual = false}>Source Search</button>
   </div>
   
   {#if active_manual}
       <div class="tab-content" >
           <div class="form-group">
               <label for="SourceType">Source Type</label>
               <div class="custom-select">
                   <select id="SourceType">
                       <option value="0">Artwork</option>
                       <option value="1">Audio Recording</option>
                       <option value="2">Bill</option>
                       <option value="3">Blogpost</option>
                       <option value="4">Book</option>
                       <option value="5">Book Section</option>
                       <option value="6">Case</option>
                       <option value="7">Software</option>
                       <option value="8">Conference Paper</option>
                       <option value="9">Dataset</option>
                   </select>
               </div>
               <Book />
           </div>
       </div>
   {:else}
       <div class="tab-content" >
           <SourceSearch />
       </div>
   {/if}
</div>

<style>
   #Page {
       width: calc(100vw - 2rem - 12vw);
       max-width: calc(100vw - 2rem - 12vw);
       color: white;
       margin: 2rem auto;
       background-color: #20232a;
       border-radius: 8px;
       box-shadow: 0 0 10px rgba(0,0,0,0.5);
       display: flex;
       position: absolute;
       right: 0.5rem;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }

   .tab-container {
       display: flex;
       border-bottom: 1px solid #ccc;
       margin-bottom: 1rem;
   }

   .tab-button {
       background-color: inherit;
       border: none;
       outline: none;
       cursor: pointer;
       transition: background-color 0.3s;
       font-size: 1rem;
       color: white;
       padding: 1rem;
   }

   .tab-button:hover {
       background-color: #3b3f47;
   }
   
   .tab-button:click {
       background-color: #ffffff;
   }

   /* .tab-button.active {
       border-bottom: 2px solid var(--color-primary-400);
   }  */

   .tab-content {
   }

   .form-group {
       display: flex;
       flex-direction: column;
       margin-bottom: 1rem;
       width: 35vw
   }

   label {
       margin-bottom: 0.5rem;
       font-weight: bold;
       color: var(--color-surface-mixed-400);
   }

   .custom-select {
       position: relative;
       width: 100%;
   }

   select {
       width: 100%;
       padding: 0.5rem;
       font-size: 1rem;
       color: #20232a;
       border: 1px solid var(--color-surface-mixed-400);
       border-radius: 4px;
       background-color: white;
       appearance: none;
   }

   select:focus {
       outline: none;
       border-color: var(--color-surface-mixed-400);
   }
</style>