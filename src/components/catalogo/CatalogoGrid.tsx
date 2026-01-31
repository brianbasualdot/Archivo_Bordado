'use client';

import { useState } from 'react';
import CategoryBar from './CategoryBar';
import CategoryModal from './CategoryModal';
import ProductCard from '../ui/ProductCard';

import { Product } from '@/types';

interface CatalogoGridProps {
    initialProducts: Product[];
}

const CATEGORIES = ['ANIMALES', 'LOGOS', 'FLORAL', 'GEOMETRICO', 'BANDERAS', 'ESCUDOS'];

export default function CatalogoGrid({ initialProducts }: CatalogoGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Filter products for the modal
    // Note: This matches tags or inferred category if you had one. 
    // Since we don't have a strict 'category' field on Matrix yet (just tags), 
    // we might need to adjust this logic later. For now, we'll try to match tags loosely.
    const filteredProducts = selectedCategory
        ? initialProducts.filter(p => p.tags?.includes(selectedCategory) || p.title.toUpperCase().includes(selectedCategory))
        : [];

    return (
        <section className="w-full flex flex-col items-center py-12 px-4">
            {/* 2. Category System */}
            <h2 className="font-serif text-4xl font-black text-brand-dark mb-8 text-center bg-brand-yellow px-4 py-2 border-4 border-brand-dark neo-shadow transform -rotate-1 inline-block">
                INDICE_DE_MATRICES
            </h2>

            <CategoryBar
                categories={CATEGORIES}
                onSelectCategory={handleCategorySelect}
            />

            {/* 1. Main Grid (110% layout ~1440px) */}
            <div className="w-full max-w-[1440px] mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {initialProducts.length > 0 ? (
                        initialProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                imageUrl={product.imageUrl || undefined}
                                stitches={product.stitches}
                                width={product.widthMm}
                                height={product.heightMm}
                                formats={product.formats}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 font-mono text-gray-400 border-4 border-dashed border-brand-dark">
                            NO HAY MATRICES CARGADAS AÚN
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Modal System */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={closeModal}
                category={selectedCategory || ''}
                products={filteredProducts.map(p => ({
                    ...p,
                    width: p.widthMm, // Adapt for modal if it expects 'width' not 'widthMm'
                    height: p.heightMm,
                    imageUrl: p.imageUrl || undefined,
                    category: 'GENERAL' // Fallback
                }))}
            />
        </section>
    );
}
