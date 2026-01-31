'use client';

import { ShoppingBag, Heart, ChevronsDown } from 'lucide-react';
import SecureImageCanvas from './SecureImageCanvas';

// Mock Props interface removed
interface ProductPageProps {
    product: {
        id: string;
        title: string;
        price: number;
        description: string | null;
        stitches: number;
        widthMm: number;
        heightMm: number;
        colors: number;
        formats: string[];
        imageUrl: string;
    }
}

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ product }: ProductPageProps) {
    const measures = `${product.widthMm}mm x ${product.heightMm}mm`;
    const formatList = product.formats.join(', ');

    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
        });
        // For now, go directly to checkout or we could show a toast
        router.push('/checkout');
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 py-8 lg:py-12">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                {/* LEFT COLUMN (60%) - VISUAL */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <SecureImageCanvas src={product.imageUrl} alt={product.title} />

                    {/* Thumbnails (Mock) */}
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="aspect-square bg-gray-200 border-2 border-brand-dark neo-shadow hover:translate-y-1 hover:shadow-none transition-all cursor-pointer flex items-center justify-center font-mono font-bold text-gray-400">
                                VIEW_{idx}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN (40%) - INFO */}
                <div className="lg:col-span-5 flex flex-col gap-8">

                    {/* Header */}
                    <div className="space-y-2 border-b-4 border-brand-dark pb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-brand-green text-white px-2 py-1 font-mono text-xs font-bold neo-shadow">PREMIUM</span>
                            {/* <span className="bg-brand-pink text-brand-dark px-2 py-1 font-mono text-xs font-bold neo-shadow">VINTAGE</span> */}
                        </div>
                        <h1 className="font-serif text-5xl font-black text-brand-dark leading-[0.9]">
                            {product.title}
                        </h1>
                        <p className="font-mono text-brand-gray-500 text-sm">REF: {product.id}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-4xl font-bold text-brand-orange border-2 border-brand-dark bg-brand-bg px-4 py-2 neo-shadow">
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </span>
                        <button className="p-3 border-2 border-brand-dark bg-white neo-shadow hover:bg-brand-pink transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Tech Specs Table */}
                    <div className="bg-brand-bg border-4 border-brand-dark p-6 neo-shadow relative">
                        <div className="absolute -top-3 left-4 bg-brand-dark text-white px-2 font-mono text-xs font-bold">FICHA_TÉCNICA</div>
                        <div className="space-y-4">
                            <SpecRow label="PUNTADAS" value={product.stitches ? product.stitches.toLocaleString() : '0'} />
                            <SpecRow label="MEDIDAS" value={measures} />
                            <SpecRow label="COLORES" value={product.colors ? product.colors.toString() : '1'} />
                            <SpecRow label="FORMATOS" value={formatList} />
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-brand-orange text-brand-dark border-4 border-brand-dark py-4 text-xl font-mono font-bold neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 group"
                    >
                        <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
                        AGREGAR AL CARRITO
                    </button>

                    <p className="text-center font-mono text-xs text-gray-500">
                        * Entrega digital inmediata (.zip)
                    </p>

                    {/* Accordions */}
                    <div className="border-t-4 border-brand-dark pt-4 space-y-4">
                        <details className="group border-2 border-brand-dark bg-white neo-shadow open:bg-brand-bg-cream transition-all">
                            <summary className="font-serif font-bold p-4 cursor-pointer flex justify-between items-center bg-brand-green/10 group-hover:bg-brand-green/20">
                                DESCRIPCIÓN DEL DISEÑO
                                <ChevronsDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="p-4 font-mono text-sm leading-relaxed border-t-2 border-brand-dark">
                                {product.description || "Sin descripción disponible."}
                            </div>
                        </details>

                        <details className="group border-2 border-brand-dark bg-white neo-shadow open:bg-brand-bg-cream transition-all">
                            <summary className="font-serif font-bold p-4 cursor-pointer flex justify-between items-center bg-brand-green/10 group-hover:bg-brand-green/20">
                                RECOMENDACIONES
                                <ChevronsDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="p-4 font-mono text-sm leading-relaxed border-t-2 border-brand-dark">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Usar entretela de 80g.</li>
                                    <li>Velocidad recomendada: 600ppm.</li>
                                    <li>Ideal para telas de algodón o denim.</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SpecRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-end border-b-2 border-brand-dark/20 pb-2 border-dashed">
            <span className="font-mono font-bold text-brand-green">{label}</span>
            <span className="font-serif font-bold text-brand-dark text-lg">{value}</span>
        </div>
    )
}
