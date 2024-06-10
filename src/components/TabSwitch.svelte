<script lang="ts">
import Book from './citation_types/Book.svelte'
import SourceSearch from './SourceSearch.svelte'

let source_add_requested = false;
let source_add_success = false;
$: active_manual = true;
function display_popup(event : any) {
  if(event.detail == true) {
      source_add_requested = true;
      source_add_success = true;
  } else {
      source_add_requested = true;
      source_add_success = false;
  }
}

</script>

<div id="Page"> 
    {#if source_add_requested}
        <div class="overlay"></div>
    {/if}

    {#if source_add_success && source_add_requested}
        <div class="popup success">
            <p>Source added successfully!</p>
            <a href="/project/sources">Go to Sources</a>
        </div>
    {:else if source_add_requested && !source_add_success}
        <div class="popup failure">
            <p>Failed to add source. Please try again.</p>
            <a href="/project/sources">Go to Sources</a>
        </div>
    {/if}
    <div class="tab-container">
        <button class="tab-button" class:tab-button-active={active_manual} on:click={()=>active_manual = true}>Manual Citation</button>
       <button class="tab-button" class:tab-button-active={!active_manual} on:click={()=>active_manual = false}>Source Search</button>
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
           <SourceSearch on:save={display_popup}/>
       </div>
   {/if}
</div>

<style>
   #Page {
       width: calc(100vw - 2rem - 12vw);
       max-width: calc(100vw - 2rem - 12vw);
       color: white;
       margin: 0rem auto;
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
       border-bottom: 1px solid var(--color-surface-mixed-500);
       
   }

   .tab-button {
       background-color: inherit;
       border: none;
       outline: none;
       cursor: pointer;
       transition: background-color 0.3s;
       font-size: 1rem;
       color: white;
       padding: 1rem 6.25vw;
   }

   .tab-button:hover {
       background-color: #3b3f47;
   }
   
   .tab-button:click {
       background-color: #ffffff;
   }

   .tab-button-active {
       background-color: #3b3f47;
       border-bottom: 4px solid var(--color-primary-500);
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

   .overlay {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, 0.5);
       z-index: 1000;
   }
</style>
