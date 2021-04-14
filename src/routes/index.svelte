<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/api/posts.json');

    if (res.ok) {
      return {
        props: {
          fetchedPosts: await res.json()
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
  import { formatDate } from '$lib/util';

  export let fetchedPosts: PostDataSummary[];
  $: posts = fetchedPosts.map(({ createdAt, ...summary }) => ({
    createdAt: formatDate(createdAt),
    ...summary
  }));
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
    {#each posts as post}
      <a class="article" href={`/posts/${post.slug}`}>
        <article>
          <time>{post.createdAt}</time>
          <h2>{post.title}</h2>
        </article>
      </a>
    {/each}
  </section>
</main>

<style lang="scss">
  .link {
    font-size: 2rem;
    color: var(--nc-tx-2);
  }
  .article {
    margin-bottom: 1rem;
    text-decoration: none;
    time {
      color: var(--nc-ac-1);
      font-size: 0.8rem;
    }
    h2 {
      color: var(--nc-tx-1);
      font-weight: normal;
      font-size: 1rem;
      padding: 0;
      margin: 0;
      border: 0;
      text-decoration: underline;
    }
  }
</style>
