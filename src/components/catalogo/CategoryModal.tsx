'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProductCard from '../ui/ProductCard';

import { ProductUI } from '@/types';


interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    products: ProductUI[];
}

export default function CategoryModal({ isOpen, onClose, category, products }: CategoryModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
                    />

                    {/* Modal Content - 80% W/H rule */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-[80%] h-[80%] bg-brand-bg border-4 border-brand-dark neo-shadow flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-brand-green p-4 flex justify-between items-center border-b-4 border-brand-dark">
                            <h2 className="font-serif text-3xl font-black text-brand-yellow tracking-tighter uppercase">
                                {category}
                            </h2>
                            <button
                                onClick={onClose}
                                className="bg-brand-yellow text-brand-dark border-2 border-brand-dark p-1 hover:bg-brand-orange transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Scrollable Grid Area */}
                        <div className="flex-1 overflow-y-auto p-8 bg-brand-bg">
                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            title={product.title}
                                            price={product.price}
                                            imageUrl={product.imageUrl || undefined}
                                            stitches={product.stitches || 0}
                                            width={product.width || 0}
                                            height={product.height || 0}
                                            formats={product.formats || []}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-brand-dark/50">
                                    <span className="font-mono text-xl">NO DATA FOUND FOR CATEGORY: {category}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
