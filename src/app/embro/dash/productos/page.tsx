import UploadMatrixForm from './UploadMatrixForm';
import ProductList from '@/components/admin/ProductList';
import { getProducts } from '@/app/actions/products';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="h-full space-y-8">
            <h2 className="font-serif font-black text-3xl mb-6 text-brand-green border-b-4 border-brand-green inline-block">
                INVENTARIO & CARGA
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: FORMULARIO */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <UploadMatrixForm />
                    </div>
                </div>

                {/* RIGHT: LISTA DE PRODUCTOS */}
                <div className="lg:col-span-2">
                    <ProductList initialProducts={products} />
                </div>
            </div>
        </div>
    );
}

