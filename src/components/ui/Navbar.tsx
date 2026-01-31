'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'CATÁLOGO', href: '/catalogo' },
        { name: 'PERSONALIZADO', href: '/personalizado' },
        { name: 'NOSOTROS', href: '/nosotros' },
    ];

    return (
        <nav className="w-full bg-brand-bg border-b-4 border-brand-dark sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-serif font-black tracking-tighter text-brand-dark hover:text-brand-orange transition-colors">
                            ARCHIVO_BORDADO
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-mono font-bold text-brand-dark border-2 border-transparent hover:border-brand-dark hover:bg-brand-yellow px-4 py-2 transition-all neo-shadow hover:neo-shadow-hover"
                            >
                                {link.name}
                            </Link>
                        ))}



                        <button className="bg-brand-orange border-2 border-brand-dark p-2 neo-shadow hover:neo-shadow-hover transition-all">
                            <ShoppingCart className="w-6 h-6 text-brand-dark" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 border-2 border-brand-dark bg-brand-yellow neo-shadow active:neo-shadow-hover transition-all"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-bg border-t-2 border-brand-dark"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block w-full text-center font-mono font-bold text-brand-dark border-2 border-brand-dark bg-white hover:bg-brand-yellow py-3 neo-shadow active:neo-shadow-hover transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex justify-center pt-4">
                                <button className="w-full bg-brand-orange border-2 border-brand-dark py-3 font-bold flex justify-center items-center gap-2 neo-shadow active:neo-shadow-hover transition-all">
                                    <ShoppingCart className="w-5 h-5" />
                                    CART (0)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
