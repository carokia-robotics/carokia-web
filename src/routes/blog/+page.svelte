<script lang="ts">
	import { base } from '$app/paths';

	const posts = [
		{
			title: 'Building an AI Robot Companion in Rust',
			slug: 'building-carokia',
			date: '2026-03-22',
			summary: 'Why we chose Rust for robotics, how the hexagonal architecture works across 8 crates, and what Carokia can do today.'
		}
	];
</script>

<div class="blog-page">
	<a href="{base}/" class="back-link">Back to home</a>
	<h1 class="page-title">Blog</h1>
	<div class="posts">
		{#each posts as post}
			<a href="{base}/blog/{post.slug}" class="post-card">
				<time datetime={post.date}>{post.date}</time>
				<h2>{post.title}</h2>
				<p>{post.summary}</p>
			</a>
		{/each}
	</div>
</div>

<style>
	.blog-page {
		max-width: 740px;
		margin: 0 auto;
		padding: 6rem 2rem 4rem;
	}
	.back-link {
		display: inline-block;
		font-size: 0.85rem;
		color: #707080;
		margin-bottom: 2rem;
	}
	.back-link:hover {
		color: #00d4ff;
	}
	.page-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 2rem;
	}
	.posts {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.post-card {
		display: block;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		transition: border-color 0.3s, transform 0.2s;
		color: inherit !important;
	}
	.post-card:hover {
		border-color: rgba(0, 212, 255, 0.3);
		transform: translateY(-2px);
		color: inherit !important;
	}
	.post-card time {
		font-size: 0.8rem;
		color: #505060;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}
	.post-card h2 {
		font-size: 1.3rem;
		font-weight: 700;
		color: #00d4ff;
		margin: 0.5rem 0;
	}
	.post-card p {
		color: #808090;
		font-size: 0.95rem;
		line-height: 1.5;
	}
</style>
