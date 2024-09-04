// /blog/[postSlug]/page.tsx

import { Metadata } from 'next';
import CommentForm from "../../../components/CommentForm";
import { getPostSlugs, getSinglePost } from "../../../lib/posts";
import { PostData, Slug } from "../../../lib/types";
import { getComments } from "../../../lib/comments";
import { getSeo } from "../../../lib/seo";
import Date from "../../../components/Date";
import { Rubik, Roboto_Slab } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], display: 'swap' });
const roboto_slab = Roboto_Slab({ subsets: ['latin'], display: 'swap' });

interface PostPageProps {
    params: {
        postSlug: string;
    };
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
    const postSlugs: Slug[] = await getPostSlugs();
    return postSlugs.map(slug => ({ postSlug: slug.slug }));
}

// Generate metadata for dynamic routes
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const seoData = await getSeo('post', params.postSlug);

    return {
        title: seoData?.title || 'Post',
        description: seoData?.metaDesc,
        openGraph: {
            title: seoData?.opengraphTitle || 'Post',
            description: seoData?.metaDesc || '',
            locale: 'en_IN',
            siteName: seoData?.opengraphSiteName || '',
            images: seoData?.opengraphImage?.mediaItemUrl ? [{ url: seoData.opengraphImage.mediaItemUrl }] : [],
        },
    };
}

export default async function Post({ params }: PostPageProps) {
    const postData = await getSinglePost(params.postSlug);
    const { comments, commentCount } = await getComments(params.postSlug);
    const seoData = await getSeo('post', params.postSlug);

    // Safely access featured image URL
    let featuredImageUrl = postData.featuredImage?.node.mediaDetails.sizes?.[1]?.sourceUrl || "/home-bg.webp";

    const excerptHtml = postData.excerpt ? { __html: postData.excerpt } : { __html: '' };
    const contentHtml = postData.content ? { __html: postData.content } : { __html: '' };

    let jsonSchema = seoData?.schema?.raw
        ? seoData.schema.raw.replace(/https:\/\/gatsby.vdisain.dev(?!\/wp-content\/uploads)/g, 'https://nextjs-headless-wordpress-theta.vercel.app/blog')
        : '';

    return (
        <>
            {jsonSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonSchema }}></script>
            )}

            <article className={`${rubik.className} font-light`}>
                <section
                    className="hero-area h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${featuredImageUrl})` }}
                >
                    <div className="absolute inset-0 bg-slate-900 opacity-40"></div>

                    <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
                        <h1 className={`${roboto_slab.className} text-6xl font-normal text-slate-100 relative z-10 py-8 mt-12`}>
                            {postData.title}
                        </h1>

                        <div className="pb-4 text-slate-100 z-10">
                            Posted on <Date dateString={postData.modified} />
                        </div>

                        <div dangerouslySetInnerHTML={excerptHtml} className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200" />
                    </div>
                </section>
                <section className="content-area py-8">
                    <div dangerouslySetInnerHTML={contentHtml} className="post-content container lg:max-w-4xl mx-auto" />
                </section>
            </article>

            <div className="container mx-auto lg:max-w-4xl">
                <h3 className="text-xl py-2 my-4 border-l-4 border-l-lime-300 pl-4">
                    {commentCount ? commentCount : 'No'} comments on this post so far:
                </h3>
                <CommentForm postId={postData.databaseId} />
            </div>

            <div className="container mx-auto lg:max-w-4xl">
                <section>
                    <ul>
                        {comments.nodes.map(comment => (
                            <li key={comment.id} className="pb-4 border-b">
                                <div className="comment-header flex justify-start items-center">
                                    <div className="py-4">
                                        {comment.author.node.avatar?.url && (
                                            <img
                                                src={comment.author.node.avatar.url}
                                                width={comment.author.node.avatar.width || 50}
                                                height={comment.author.node.avatar.height || 50}
                                                className="rounded-full max-w-[50px] mr-4"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold">{comment.author.node.name}</div>
                                        <div className="text-sm">
                                            <Date dateString={comment.date} />
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-body pl-[66px]">
                                    <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
}
