import { getPosts } from '$lib/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const posts = await getPosts();

  return { body: JSON.stringify(posts) };
};
