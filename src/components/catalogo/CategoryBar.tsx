'use client';

import { motion } from 'framer-motion';

interface CategoryBarProps {
    categories: string[];
    onSelectCategory: (category: string) => void;
}

export default function CategoryBar({ categories, onSelectCategory }: CategoryBarProps) {
    return (
        <div className="w-full flex flex-wrap justify-center gap-4 py-8">
            {categories.map((cat, index) => (
                <motion.button
                    key={cat}
                    whileHover={{ y: -4, x: -4, boxShadow: '6px 6px 0px 0px #222222' }}
                    whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px #222222' }}
                    onClick={() => onSelectCategory(cat)}
                    className="
            bg-brand-bg 
            text-brand-dark 
            font-mono font-bold text-lg 
            uppercase 
            px-6 py-3 
            border-2 border-brand-dark 
            shadow-[4px_4px_0px_0px_#222222]
            transition-all
            hover:bg-brand-yellow
          "
                >
                    {cat}
                </motion.button>
            ))}
        </div>
    );
}
