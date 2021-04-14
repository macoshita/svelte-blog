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
  import { formatDate } from '$lib/util';

  export let post: PostData;
  $: createdAt = formatDate(post.createdAt);
</script>

<svelte:head>
  <title>{post.title} / @macoshita</title>
</svelte:head>

<time class="time">{createdAt}</time>
<h1 class="title">{post.title}</h1>

{@html post.content}

<style lang="scss">
  .time {
    color: var(--nc-ac-1);
  }
  .title {
    padding: 0;
    margin-bottom: 2rem;
  }
</style>
