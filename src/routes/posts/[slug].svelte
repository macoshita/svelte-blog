<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		try {
			let res = await fetch(`/api/posts/${page.params.slug}.json`);

			if (res.ok) {
				return {
					props: {
						post: await res.json()
					}
				};
			}

			return {
				status: res.status,
				error: new Error('Failed to fetch posts')
			};
		} catch (e) {
			return {
				status: 500,
				error: e
			};
		}
	};
</script>

<script lang="ts">
	import type { PostData } from '$lib/posts';

	export let post: PostData;
</script>

<svelte:head>
	<title>{post.title} / @macoshita</title>
</svelte:head>

<h1>{post.title}</h1>

{@html post.content}
