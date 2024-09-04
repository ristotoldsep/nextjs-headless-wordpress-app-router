// blog/index.tsx

import { PostsData } from "@/lib/types";
import { getPostList } from "@/lib/posts";
import PostList from "@/components/PostList";

interface Props {
  allPosts: PostsData;
  token: string;
}

export const metadata = {
    title: 'Blog',
    description: 'Read our latest articles!'
}

export default async function BlogHome() {

  const initialPosts = await getPostList();
  const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN ?? "";

  return (
    <>
      <section className="hero h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] pt-20 relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
          Blog
        </h1>

        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Read our latest articles!
        </p>
      </section>
      <PostList initialPosts={initialPosts} token={token} />
    </>
  );
}
