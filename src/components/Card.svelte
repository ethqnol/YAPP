<script lang="ts">

export let title : string = "";
export let quote : string = "";
export let start_page: number;
export let end_page: number;
export let href: string = "";




</script>

<div class="link-card">
	<a href={href}>
		<h2>
			{title}
			<span>&rarr;</span>
		</h2>
		<p>
			{quote.slice(0, 65) + (quote.length > 65 ? "..." : "")}
		</p>
	</a>
</div>

<style>
	.link-card {
		display: flex;
		max-height: 18vh;
		height: 18vh;
		padding: 1px;
		background-color: var(--color-surface-mixed-300);
		background-image: none;
		background-size: 400%;
		border-radius: 7px;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
		overflow: hidden;
	}
	.link-card > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: calc(1.5rem - 1px);
		border-radius: 8px;
		color: white;
		background-color: #23262d;
		opacity: 0.8;
	}
	h2 {
		margin: 0;
		font-size: 1rem;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}
	h4 {
		margin-top: 0;
	}
	p {
		margin-top: 0.3rem;
		margin-bottom: 0;
		font-size: 0.9rem;
	}
	.link-card:is(:hover, :focus-within) {
		background-position: 0;
		background-image: var(--accent-gradient);
	}
	.link-card:is(:hover, :focus-within) h2 {
		color: rgb(var(--accent-light));
	}
</style>
