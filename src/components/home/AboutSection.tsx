'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, PenTool, Monitor, Scissors } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section className="bg-brand-bg py-20 px-4 md:px-8 border-t-4 border-brand-dark overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

                {/* COLUMN LEFT: TEXT (60% -> 3/5 cols) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 space-y-8"
                >
                    <div className="inline-block bg-brand-pink text-brand-dark font-mono font-bold px-4 py-1 border-2 border-brand-dark neo-shadow transform -rotate-2">
                        DESDE BUENOS AIRES, ARGENTINA
                    </div>

                    <h2 className="font-serif font-black text-4xl md:text-5xl text-brand-dark leading-tight">
                        PRECISIÓN DIGITAL, <br />
                        <span className="text-brand-green italic">PASIÓN ARTESANAL.</span>
                    </h2>

                    <div className="font-mono text-gray-700 text-lg space-y-6 leading-relaxed">
                        <p>
                            <strong>Archivo Bordado</strong> nace de la experiencia real en el taller. No somos solo diseñadores frente a una pantalla; venimos del ruido de las máquinas y la textura de la tela.
                        </p>
                        <p>
                            Como creadores de <span className="font-bold underline decoration-brand-orange decoration-4">Biblioteca de Bordados</span>, pasamos años fabricando productos físicos: posavasos, individuales y servilletas de tusor que exigían la máxima calidad. Entendemos lo que pasa cuando una matriz corta hilo o deforma la tela.
                        </p>
                    </div>

                    {/* SOFTWARE STACK */}
                    <div className="bg-white border-2 border-brand-dark p-6 neo-shadow-sm">
                        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> TECH STACK & HERRAMIENTAS
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['Adobe Illustrator', 'Adobe Photoshop', 'Embird Studio', 'Wilcom'].map((tool) => (
                                <span key={tool} className="bg-gray-100 text-brand-dark font-mono text-xs px-3 py-1 border border-brand-dark flex items-center gap-2">
                                    <PenTool className="w-3 h-3 text-brand-orange" /> {tool}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* QUOTE BLOCK */}
                    <div className="bg-brand-yellow border-4 border-brand-dark p-6 neo-shadow transform rotate-1">
                        <p className="font-serif font-bold text-xl text-center">
                            "No solo digitalizamos dibujos; creamos caminos de hilo optimizados."
                        </p>
                    </div>

                </motion.div>

                {/* COLUMN RIGHT: IMAGE (40% -> 2/5 cols) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:col-span-2 relative"
                >
                    {/* DECORATIVE ELEMENTS */}
                    <div className="absolute top-[-20px] right-[-20px] bg-brand-orange w-16 h-16 border-4 border-brand-dark z-0"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] bg-brand-pink w-16 h-16 border-4 border-brand-dark rounded-full z-0"></div>

                    {/* MAIN IMAGE CONTAINER */}
                    <div className="relative z-10 bg-white border-4 border-brand-dark shadow-[12px_12px_0px_0px_#0F5F3D]">
                        <div className="aspect-[4/5] relative grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="https://placehold.co/600x750/png?text=Taller+Textil"
                                alt="Workspace de Bordado"
                                fill
                                className="object-cover"
                            />

                            {/* OVERLAY BADGE */}
                            <div className="absolute bottom-4 right-4 bg-white border-2 border-brand-dark px-3 py-1 font-mono text-xs font-bold flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 text-brand-green" />
                                CALIDAD VERIFICADA
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
