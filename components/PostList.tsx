'use client'
import { Link } from 'next-view-transitions'
import Date from "@/components/Date";
import FeaturedImage from "@/components/FeaturedImage";
import LoadMore from "@/components/LoadMore";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { PostsData, Post } from "@/lib/types";

// Define the props interface for PostList
interface PostListProps {
  initialPosts: PostsData;
  token: string;
}

export default function PostList({ initialPosts, token }: PostListProps) {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          easing: "ease", // Animation easing effect
          once: false, // Whether animation should happen only once
        });
    }, []);

    const [posts, setPosts] = useState<PostsData>(initialPosts);

    return (
        <main className="px-8">
        <section className="container mx-auto lg:max-w-6xl post-list mt-8">
          <ul>
            {posts.nodes.map((post: Post) => (
              <li
                key={post.slug}
                className="grid grid-cols-5 gap-8 mb-8"
                data-aos="fade-in"
              >
                <div className="col-span-2">
                  <FeaturedImage post={post} />
                </div>
                <div className="col-span-3">
                  <h2 className="py-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#063E67] text-2xl hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="pb-4">
                    Published on <Date dateString={post.date} />
                  </div>
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                  ></div>
                  <div className="py-4">
                    Category:{" "}
                    {post.categories?.nodes.map((category, index) => (
                      <span key={category.slug}>
                        <Link
                          className="text-[#063E67] hover:text-blue-500"
                          href={`/category/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                        {index < post.categories!.nodes.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="py-8 text-center">
            <LoadMore posts={posts} setPosts={setPosts} token={token} />
          </div>
        </section>
      </main>
    )
}