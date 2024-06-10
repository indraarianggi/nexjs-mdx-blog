import { defineConfig, defineCollection, s } from "velite";

/**
 * function to transform value of schema
 * especially remove "/blog" from slug (returned from s.path() -> defined in schema)
 */
const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

// collection schema for posts
const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx", // glob pattern used to find content files for the collection
  schema: s
    .object({
      slug: s.path(), // example result: "/blog/hello-world"
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
