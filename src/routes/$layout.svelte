<script lang="ts">
  import '@exampledev/new.css';
  import 'prism-themes/themes/prism-a11y-dark.css';
</script>

<header>
  <h1><a class="blog-title" href="/">@macoshita</a></h1>
</header>

<slot />

<style lang="scss">
  .blog-title {
    color: var(--nc-tx-1);
    text-decoration: none;
  }
</style>
