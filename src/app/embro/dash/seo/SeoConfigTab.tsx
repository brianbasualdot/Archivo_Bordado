'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Tag, Save, X } from 'lucide-react';

export default function SeoConfigTab() {
    const [formData, setFormData] = useState({
        siteTitle: "Archivo Bordado | Matrices Digitales",
        description: "Biblioteca de matrices de bordado para producción textil en Argentina. Estilo Retro & Neobrutalista.",
        defaultAlt: "Matriz de bordado digital optimizada - Archivo Bordado",
        keywords: ["bordado", "matrices", "embroidery", "argentina", "digitalización", "mundial", "marcas"],
        currentTag: ""
    });
    const [saved, setSaved] = useState(false);

    // KEYWORD LOGIC
    const addTag = () => {
        const tag = formData.currentTag.trim().toLowerCase();
        if (tag === 'minimalista') {
            alert("❌ PALABRA PROHIBIDA: 'minimalista' no va con nuestra identidad.");
            return;
        }
        if (tag && !formData.keywords.includes(tag)) {
            setFormData(prev => ({ ...prev, keywords: [...prev.keywords, tag], currentTag: "" }));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, keywords: prev.keywords.filter(t => t !== tagToRemove) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        console.log("Saving SEO Config:", formData);
        // TODO: Connect to Server Action to save to Prisma
    };

    return (
        <div className="bg-white border-4 border-brand-dark neo-shadow flex flex-col relative w-full main-content-mobile">

            {/* HEADER */}
            <div className="bg-blue-600 text-white p-4 border-b-4 border-brand-dark flex justify-between items-center">
                <h2 className="font-serif font-black text-2xl flex items-center gap-2">
                    <Globe className="w-8 h-8" /> ORIENTACIÓN DE ARCHIVO (SEO)
                </h2>
                <div className="font-mono text-xs bg-black/20 px-2 py-1">
                    GLOBAL_CONFIG
                </div>
            </div>

            <div className="p-6 flex-grow">
                <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">

                    {/* 1. META-TAGS GLOBALES */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b-2 border-dashed border-gray-300 pb-2 mb-4">
                            <Search className="w-5 h-5 text-blue-600" />
                            <h3 className="font-mono font-bold text-lg text-blue-600">META-TAGS GLOBALES</h3>
                        </div>

                        <div className="grid gap-6">
                            <div>
                                <label className="font-mono font-bold text-sm block mb-1">TÍTULO DEL SITIO (Title)</label>
                                <input
                                    value={formData.siteTitle}
                                    onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                                    className="w-full border-2 border-brand-dark p-3 font-mono text-lg focus:ring-4 focus:ring-blue-600/30 outline-none shadow-[4px_4px_0px_0px_#000]"
                                />
                                <p className="text-xs font-mono text-gray-500 mt-1">Aparece en la pestaña del navegador y resultados de Google.</p>
                            </div>

                            <div>
                                <label className="font-mono font-bold text-sm block mb-1">DESCRIPCIÓN GLOBAL (Meta Description)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full border-2 border-brand-dark p-3 font-mono focus:ring-4 focus:ring-blue-600/30 outline-none shadow-[4px_4px_0px_0px_#000]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. GESTOR DE KEYWORDS */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b-2 border-dashed border-gray-300 pb-2 mb-4">
                            <Tag className="w-5 h-5 text-blue-600" />
                            <h3 className="font-mono font-bold text-lg text-blue-600">PALABRAS CLAVE (TAGS)</h3>
                        </div>

                        <div className="flex gap-2">
                            <input
                                value={formData.currentTag}
                                onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Ej: camisetas, parches..."
                                className="flex-grow border-2 border-brand-dark p-3 font-mono outline-none"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="bg-blue-600 text-white font-bold px-6 border-2 border-brand-dark hover:bg-blue-700 shadow-[2px_2px_0px_0px_#000]"
                            >
                                AGREGAR
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 p-4 bg-gray-100 border-2 border-brand-dark min-h-[100px] content-start">
                            {formData.keywords.map(tag => (
                                <motion.span
                                    key={tag}
                                    initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                    className="bg-white border-2 border-brand-dark px-3 py-1 font-mono text-sm font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_#ccc]"
                                >
                                    #{tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.span>
                            ))}
                            {formData.keywords.length === 0 && (
                                <span className="text-gray-400 font-mono text-sm italic">Sin etiquetas definidas...</span>
                            )}
                        </div>
                    </div>

                    {/* 3. IMÁGENES */}
                    <div>
                        <label className="font-mono font-bold text-sm block mb-1">TEXTO ALT GLOBAL (Para Imágenes)</label>
                        <input
                            value={formData.defaultAlt}
                            onChange={(e) => setFormData({ ...formData, defaultAlt: e.target.value })}
                            className="w-full border-2 border-brand-dark p-3 font-mono focus:ring-4 focus:ring-blue-600/30 outline-none shadow-[4px_4px_0px_0px_#000]"
                        />
                    </div>

                </form>
            </div>

            {/* FOOTER ACTION */}
            <div className="bg-brand-bg p-4 border-t-4 border-brand-dark flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-brand-green text-white border-2 border-brand-dark px-8 py-3 font-black font-mono text-xl flex items-center gap-2 neo-shadow hover:neo-shadow-hover transition-all"
                >
                    <Save /> {saved ? 'DATOS GUARDADOS!' : 'GUARDAR CAMBIOS'}
                </button>
            </div>

        </div>
    );
}
