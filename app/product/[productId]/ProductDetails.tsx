"use client";
import product from "@/utils/product";
interface ProductDetailsProps{
    product: any;
}
const ProductDetails: React.FC<ProductDetailsProps> =
({ product }) => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex">images</div>
        <div>
            <h2 className="text-3xl font-medium
            text-slate-700">{product.name}</h2>
            </div>
    </div> );
};

export default ProductDetails;