<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		let res = await fetch('/api/posts.json');

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error('Failed to fetch posts')
		};
	};
</script>

<script lang="ts">
	import type { PostDataSummary } from '$lib/posts';

	export let posts: PostDataSummary[];
</script>

<svelte:head>
	<title>@macoshita</title>
</svelte:head>

<main>
	<p>
		Software Engineer ❤ Flutter/Dart, Svelte, Elixir, etc.<br />
		<a class="link" href="https://github.com/macoshita"><ion-icon name="logo-github" /></a>
		<a class="link" href="https://twitter.com/macoshita"><ion-icon name="logo-twitter" /></a>
	</p>

	<section>
		<ul>
			{#each posts as post}
				<li><a href={`/posts/${post.slug}`}>{post.title}</a></li>
			{/each}
		</ul>
	</section>
</main>

<style lang="scss">
	.link {
		font-size: 2rem;
		color: var(--nc-tx-2);
	}
</style>
