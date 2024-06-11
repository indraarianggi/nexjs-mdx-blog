import { notFound } from "next/navigation";

import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import "@/styles/mdx.css";

interface Props {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: Props["params"]) {
  const slug = params?.slug?.join("/");

  // find a post that matches the slug from params
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

// To statically generate page (SSG) for each posts
export async function generateStaticParams(): Promise<Props["params"][]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert container py-6 max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>

      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />

      <MDXContent code={post.body} />
    </article>
  );
}
