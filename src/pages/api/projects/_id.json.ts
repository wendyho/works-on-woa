import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;
export const get: APIRoute = async ({ params }) => {
  const id = params.id;
  const product = await getEntry("projects", id as string);
  console.log(product);

  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
