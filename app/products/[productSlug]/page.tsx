// pages/products/[productSlug].tsx

import { getAllProducts, getProductBySlug } from '@/lib/products';
import Image from 'next/image';

// Define an interface for the params
interface ProductPageProps {
    params: {
      productSlug: string;
    };
  }

export const generateStaticParams = async () => {
    const products = await getAllProducts();

    const paths = products.map((product) => (
        { productSlug: product.slug }
    ));

    return paths;
};

export const generateMetadata = async ({ params }: ProductPageProps) => {
    const slug = params?.productSlug as string;
    const product = await getProductBySlug(slug);

    return {
        title: product?.title || 'Product',
    }
}

export default async function SingleProduct({ params }: ProductPageProps) {
    const slug = params?.productSlug as string;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            notFound: true,
        };
    }

    // console.log(product);

    const image = product.productFields.thumbnail.node.mediaDetails.sizes[0];

    return (
        <>
            <div className="h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] relative pt-[100px]">
                <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

                <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
                    {product.title}
                </h1>

                <p className="relative z-10 text-center text-slate-200 text-2xl">
                    {product.productCategories.nodes[0]?.name}
                </p>
            </div>
            <main className="px-8 py-12 min-h-[65vh]">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <div>
                        <Image
                            width={parseInt(image.width)}
                            height={parseInt(image.height)}
                            src={image.sourceUrl}
                            alt="product image"
                            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            placeholder="blur"
                            className="product_image"
                        />
                    </div>
                    <div>
                        <div className="text-md font-semibold mb-1">Category</div>
                        <div className="text-lg mb-8">{product.productCategories.nodes[0]?.name}</div>
                        <div className="text-md font-semibold mb-1">Summary</div>
                        <div className="text-lg mb-8">{product.productFields.summary}</div>
                    </div>
                </div>
            </main>
        </>
    );
}
