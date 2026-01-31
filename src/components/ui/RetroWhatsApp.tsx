'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function RetroWhatsApp() {
    return (
        <Link
            href="https://wa.me/5491112345678" // Placeholder number
            target="_blank"
            className="fixed bottom-8 right-8 z-50 pointer-events-auto"
        >
            <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative group"
            >
                {/* RETRO PIXEL SHADOW */}
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />

                {/* MAIN BUTTON */}
                <div className="relative bg-brand-green border-4 border-black p-4 flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-white fill-current stroke-[2.5]" />
                </div>

                {/* TOOLTIP BUBBLE */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-yellow border-4 border-black px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap neo-shadow pointer-events-none">
                    <span className="font-mono font-bold text-black text-sm">¿CONSULTAS? CHATEA YA</span>
                </div>
            </motion.div>
        </Link>
    );
}
