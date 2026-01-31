'use client';

import { motion } from 'framer-motion';
import { FileCode, Maximize2, Hash } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    stitches: number;
    width: number;
    height: number;
    formats: string[];
}

export default function ProductCard({
    id,
    title,
    price,
    imageUrl,
    stitches,
    width,
    height,
    formats,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="w-full max-w-sm bg-brand-bg border-4 border-brand-dark neo-shadow group cursor-pointer overflow-hidden flex flex-col"
        >
            {/* Image Container with Link */}
            <Link href={`/productos/${id}`} className="relative block w-full h-64 border-b-4 border-brand-dark bg-gray-200">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-brand-dark/20 font-mono text-4xl font-bold">
                        NO IMG
                    </div>
                )}

                {/* Price Tag Overlay */}
                <div className="absolute top-4 right-4 bg-brand-yellow border-2 border-brand-dark px-3 py-1 neo-shadow rotate-3 group-hover:rotate-0 transition-transform z-10">
                    <span className="font-mono font-bold text-lg">${price.toFixed(2)}</span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col gap-4 flex-grow">
                <Link href={`/productos/${id}`}>
                    <h3 className="font-serif font-black text-2xl text-brand-dark leading-tight group-hover:text-brand-orange transition-colors">
                        {title}
                    </h3>
                </Link>

                {/* Tech Specs */}
                <div className="bg-brand-green/10 border-2 border-brand-green p-3 space-y-2">
                    {/* Stitches */}
                    <div className="flex items-center justify-between text-brand-green text-sm font-mono">
                        <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            <span>PUNTADAS</span>
                        </div>
                        <span className="font-bold">{stitches.toLocaleString()}</span>
                    </div>

                    {/* Dimensions */}
                    <div className="flex items-center justify-between text-brand-green text-sm font-mono">
                        <div className="flex items-center gap-2">
                            <Maximize2 className="w-4 h-4" />
                            <span>MEDIDAS</span>
                        </div>
                        <span className="font-bold">{width}mm x {height}mm</span>
                    </div>

                    {/* Formats */}
                    <div className="flex items-center justify-between text-brand-green text-sm font-mono pt-2 border-t border-brand-green/30">
                        <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4" />
                            <span>FORMATOS</span>
                        </div>
                        <span className="font-bold text-xs uppercase">{formats.join(', ')}</span>
                    </div>
                </div>

                {/* Action */}
                <Link href={`/productos/${id}`} className="w-full mt-auto block">
                    <button className="w-full bg-brand-dark text-brand-bg border-2 border-transparent py-3 font-bold font-mono hover:bg-brand-orange hover:text-brand-dark hover:border-brand-dark transition-colors">
                        VER DETALLES
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
