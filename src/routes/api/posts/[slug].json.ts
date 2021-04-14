import { getPost } from '$lib/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);

  return { body: post };
};
