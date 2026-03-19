<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 80px;
	}

	:global(body) {
		background: #0a0a0f;
		color: #e0e0e0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.6;
		overflow-x: hidden;
	}

	:global(a) {
		color: #00d4ff;
		text-decoration: none;
	}

	:global(a:hover) {
		color: #7c3aed;
	}
</style>
