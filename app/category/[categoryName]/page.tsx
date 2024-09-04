// /[categoryName]/page.tsx

import { getCategoryDetails, getCategorySlugs, getPostList } from "@/lib/posts";
import PostList from "@/components/PostList";
import { PostsData } from "@/lib/types";

// Define an interface for the params
interface CategoryArchiveProps {
  params: {
    categoryName: string;
  };
}

// Generate static params for dynamic routes
export const generateStaticParams = async () => {
  const categories = await getCategorySlugs();

  const paths = categories.map((category) => ({ categoryName: category.slug }));

  return paths;
};

// Generate metadata for dynamic routes
export const generateMetadata = async ({ params }: CategoryArchiveProps) => {
  const categoryDetails = await getCategoryDetails(params?.categoryName);

  return {
    title: categoryDetails?.name || "Category Archive",
  };
};

// Page component using async and the params
export default async function CategoryArchive({ params }: CategoryArchiveProps) {
  const categoryPosts: PostsData = await getPostList(null, {
    key: "categoryName",
    value: params?.categoryName,
  });

  const categoryDetails = await getCategoryDetails(params?.categoryName);

  const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN ?? "";

  return (
    <>
      <div className="hero blog_category_hero h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] pt-[140px] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <h1 className="text-4xl text-center text-slate-100 relative z-10 py-8">
          Category Archive: {categoryDetails.name}
        </h1>

        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Found {categoryDetails.count} posts under this category
        </p>
      </div>
      <PostList initialPosts={categoryPosts} token={token} />
    </>
  );
}
