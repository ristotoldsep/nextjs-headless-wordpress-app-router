import Card from "@/components/Card";
import { getAllProducts } from "@/lib/products";

export const metadata = {
    title: 'Products',
    description: 'Custom post type for products',
}

const ProductsList = async () => {
    const products = await getAllProducts();

    // console.log(products);

    return (
        <>
            <div className="h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] relative pt-[100px]">
                <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

                <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
                    Products
                </h1>

                <p className="relative z-10 text-center text-slate-200 text-2xl">
                    Custom post type + taxonomy + ACF fields
                </p>
            </div>
            <main className="px-8 py-12 min-h-[65vh]">
                <div className="max-w-5xl mx-auto grid text-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            title={product.title}
                            thumbnail={product.productFields.thumbnail.node.mediaDetails.sizes[0].sourceUrl}
                            subtitle={product.productCategories.nodes[0].name}
                            btnLabel="Learn more"
                            href={`/products/${product.slug}`}
                        />
                    ))}
                </div>
            </main>
        </>
    );
};

export default ProductsList;
