'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "¿QUÉ FORMATOS DE ARCHIVO RECIBO?",
        answer: "Entregamos un paquete .ZIP universal. Incluye los formatos más estándar de la industria: .DST (Tajima), .PES (Brother), .XXX (Singer), .JEF (Janome) y .EXP (Melco). Si necesitás uno específico, consultanos antes.",
    },
    {
        question: "¿CÓMO ES EL ENVÍO AUTOMÁTICO?",
        answer: "Es instantáneo. Apenas se confirma tu pago, nuestro sistema dispara un correo a tu casilla con el link de descarga directa. Funciona 24/7.",
    },
    {
        question: "¿HAY DESCUENTOS EN ARGENTINA?",
        answer: "Sí. Si elegís pagar con Transferencia Bancaria, tenés un 10% OFF automático. El precio se actualiza solo en el checkout al seleccionar este medio de pago.",
    },
    {
        question: "¿CÓMO GARANTIZAN LA CALIDAD?",
        answer: "No usamos autotraza. Cada matriz es dibujada nodo por nodo en Embird Studio y Adobe Illustrator por bordadores reales, probando densidades y compensación de tire para evitar roturas de hilo.",
    },
    {
        question: "¿PUEDO VENDER LO QUE BORDO?",
        answer: "¡Por supuesto! Tenés licencia comercial libre para vender los PRODUCTOS FÍSICOS bordados. Lo único que no podés hacer es revender o regalar el archivo digital.",
    }
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 bg-white border-b-4 border-brand-dark">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="font-serif font-black text-4xl inline-flex items-center gap-3">
                        <HelpCircle className="w-10 h-10 text-brand-orange" />
                        PREGUNTAS FRECUENTES
                    </h2>
                </div>

                <div className="space-y-6">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                whileHover={{ y: -4, x: -4 }}
                                className={`
                            border-4 border-brand-dark neo-shadow transition-shadow
                            ${isOpen ? 'shadow-[8px_8px_0px_0px_#222]' : 'hover:shadow-[8px_8px_0px_0px_#FA8112]'}
                        `}
                            >
                                {/* HEADER */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`
                                w-full text-left p-6 flex justify-between items-center font-mono font-bold text-lg border-b-4 border-transparent
                                transition-colors duration-300
                                ${isOpen ? 'bg-brand-orange text-brand-dark border-brand-dark' : 'bg-brand-yellow text-brand-dark'}
                            `}
                                >
                                    <span>{faq.question}</span>
                                    <span className="font-mono text-2xl bg-white border-2 border-brand-dark w-8 h-8 flex items-center justify-center">
                                        {isOpen ? '-' : '+'}
                                    </span>
                                </button>

                                {/* BODY */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, height: "auto" },
                                                collapsed: { opacity: 0, height: 0 }
                                            }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="p-6 bg-brand-bg font-mono text-sm leading-relaxed border-t-0 text-gray-800">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
