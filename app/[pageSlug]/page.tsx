// [pageSlug]/page.tsx

import { getPageSlugs, getSinglePage } from "@/lib/pages";
import UpdateHeaderClass from "@/components/UpdateHeaderClass"; // Import the client component

// Define an interface for the params
interface PageProps {
    params: {
        pageSlug: string;
    };
}

// Generate static params for dynamic routes
export const generateStaticParams = async () => {
    const pageSlugs = await getPageSlugs();

    const paths = pageSlugs.map((slug) => ({
        pageSlug: slug.slug,
    }));

    return paths;
};

// Generate metadata for dynamic routes
export const generateMetadata = async ({ params }: PageProps) => {
    const pageData = await getSinglePage(params.pageSlug);

    return {
        title: pageData?.title || "Page",
    };
};

// Page component using async and the params
const Page = async ({ params }: PageProps) => {
    const pageData = await getSinglePage(params.pageSlug);

    return (
        <>
            {/* Use the client-side component to update the headerClass */}
            <UpdateHeaderClass className="!bg-slate-700" /> {/* Set the desired header class */}

            <section className="content-area py-8 pt-[100px] relative">
                <article>
                    <h1 className="text-6xl text-center text-slate-700 relative py-8">
                        {pageData.title}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: pageData.content }}
                        className="post-content container mx-auto lg:max-w-4xl"
                    />
                </article>
            </section>
        </>
    );
};

export default Page;
