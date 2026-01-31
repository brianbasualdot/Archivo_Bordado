'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Package, CreditCard } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ProductCard from '@/components/ui/ProductCard';
import FaqSection from '@/components/home/FaqSection';

// MOCK DATA FOR FEATURED. Replace with real data later.
const FEATURED_PRODUCTS = [
    {
        id: 'prod_001',
        title: 'NIKE VINTAGE 90s',
        price: 3500,
        imageUrl: 'https://placehold.co/600x600/png?text=NIKE+VINTAGE',
        stitches: 12500,
        width: 120,
        height: 45,
        formats: ['DST', 'PES', 'JEF'],
    },
    {
        id: 'prod_002',
        title: 'ADIDAS TREFOIL',
        price: 3200,
        imageUrl: 'https://placehold.co/600x600/png?text=ADIDAS',
        stitches: 8900,
        width: 85,
        height: 85,
        formats: ['DST', 'PES'],
    },
    {
        id: 'prod_003',
        title: 'CHAMPION SCRIPT',
        price: 2800,
        stitches: 15600,
        width: 200,
        height: 60,
        formats: ['DST', 'XXX'],
    },
    {
        id: 'prod_004',
        title: 'RALPH LAUREN PONY',
        price: 4500,
        imageUrl: 'https://placehold.co/600x600/png?text=POLO',
        stitches: 5400,
        width: 25,
        height: 55,
        formats: ['DST', 'PES', 'EXP'],
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col bg-brand-bg text-brand-dark overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative py-24 px-4 border-b-4 border-brand-dark bg-grid-pattern overflow-hidden">
                <div className="absolute inset-0 bg-brand-bg/90 z-0" />
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="bg-brand-yellow border-2 border-brand-dark px-4 py-1 font-mono font-bold text-sm neo-shadow mb-6 inline-block transform -rotate-2">
                            V 1.0 — BETA PÚBLICA
                        </span>
                        <h1 className="font-serif font-black text-5xl md:text-7xl leading-tight max-w-4xl mx-auto mb-6">
                            LA BIBLIOTECA DIGITAL DEL <span className="bg-brand-green text-white px-4 italic transform -skew-x-12 inline-block">BORDADOR</span> PROFESIONAL
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="font-mono text-lg md:text-xl max-w-2xl mx-auto text-brand-dark/80"
                    >
                        Matrices probadas, optimizadas y listas para producción.
                        Sin suscripciones. Pagá solo lo que bordás.
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/catalogo">
                            <button className="bg-brand-orange text-brand-dark border-4 border-brand-dark px-8 py-4 text-xl font-black font-mono neo-shadow hover:neo-shadow-hover hover:scale-105 transition-all flex items-center gap-3">
                                EXPLORAR ARCHIVO <ArrowRight className="w-6 h-6" />
                            </button>
                        </Link>
                    </motion.div>

                </div>
            </section>

            {/* FEATURED PRODUCTS (110% WIDTH GRID) */}
            <section className="py-20 border-b-4 border-brand-dark bg-white">
                <div className="flex flex-col items-center mb-12 px-4">
                    <h2 className="font-serif font-black text-4xl mb-2 flex items-center gap-2">
                        <span className="w-4 h-4 bg-brand-dark inline-block" />
                        DESTACADOS DEL MES
                    </h2>
                    <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">Colección curada v.2024</p>
                </div>

                {/* 110% Width Container */}
                <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FEATURED_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/catalogo" className="font-mono font-bold border-b-4 border-brand-pink hover:bg-brand-pink hover:text-white transition-colors text-lg">
                            VER TODO EL CATÁLOGO &rarr;
                        </Link>
                    </div>
                </div>
            </section>



            {/* HOW IT WORKS / TRANSPARENCY */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="font-serif font-black text-4xl border-4 border-brand-dark bg-white px-8 py-2 inline-block neo-shadow rotate-1">
                            CÓMO FUNCIONA
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        {/* STEP 1 */}
                        <div className="border-4 border-brand-dark bg-brand-yellow p-6 neo-shadow hover:-translate-y-2 transition-transform h-full flex flex-col">
                            <span className="font-black text-6xl text-brand-dark/20 font-serif mb-4">01</span>
                            <h3 className="font-bold font-mono text-xl mb-2 flex items-center gap-2">
                                <Package className="w-6 h-6" /> EXPLORAR
                            </h3>
                            <p className="font-mono text-sm leading-relaxed">
                                Navegá por categorías o usá el buscador inteligente para encontrar tu matriz ideal.
                            </p>
                        </div>

                        {/* STEP 2 */}
                        <div className="border-4 border-brand-dark bg-brand-orange p-6 neo-shadow hover:-translate-y-2 transition-transform h-full flex flex-col">
                            <span className="font-black text-6xl text-brand-dark/20 font-serif mb-4">02</span>
                            <h3 className="font-bold font-mono text-xl mb-2 flex items-center gap-2">
                                <CreditCard className="w-6 h-6" /> PAGO
                            </h3>
                            <p className="font-mono text-sm leading-relaxed">
                                Aboná con Mercado Pago o Transferencia (-10% OFF). Sin registros molestos.
                            </p>
                        </div>

                        {/* STEP 3 */}
                        <div className="border-4 border-brand-dark bg-brand-green p-6 neo-shadow hover:-translate-y-2 transition-transform h-full flex flex-col text-white">
                            <span className="font-black text-6xl text-white/30 font-serif mb-4">03</span>
                            <h3 className="font-bold font-mono text-xl mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6" /> SANITIZACIÓN
                            </h3>
                            <p className="font-mono text-sm leading-relaxed text-white/90">
                                Cada archivo es procesado por nuestro <span className="font-bold bg-black/20 px-1">Sharp Protocol</span> para garantizar integridad.
                            </p>
                        </div>

                        {/* STEP 4 */}
                        <div className="border-4 border-brand-dark bg-brand-pink p-6 neo-shadow hover:-translate-y-2 transition-transform h-full flex flex-col">
                            <span className="font-black text-6xl text-brand-dark/20 font-serif mb-4">04</span>
                            <h3 className="font-bold font-mono text-xl mb-2 flex items-center gap-2">
                                <Zap className="w-6 h-6" /> ENVÍO FLASH
                            </h3>
                            <p className="font-mono text-sm leading-relaxed">
                                Recibís un mail automático de <strong>Resend</strong> con tu link de descarga directa (.ZIP).
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <FaqSection />

            <Footer />
        </main>
    );
}
