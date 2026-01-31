'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Tag } from 'lucide-react';
import NeobrutalUploader from '@/components/custom/NeobrutalUploader';
import NeobrutalZipUploader from '@/components/admin/NeobrutalZipUploader';
import { createProduct } from '@/app/actions/products';

// ...

// Extended interface for local form state
// Extended interface for local form state
interface LocalFormData {
    nombre?: string;
    description?: string;
    precio?: number;
    puntadas?: number;
    ancho_mm?: number;
    alto_mm?: number;
    colores?: number;
    formatos?: string[];
    tags?: string[];
    imageFile?: File;
    zipFile?: File;
}

export default function UploadMatrixForm() {
    const [formData, setFormData] = useState<LocalFormData>({
        formatos: [],
        tags: [],
    });
    const [saved, setSaved] = useState(false);
    const [isPending, setIsPending] = useState(false); // Loading state

    const [customCategory, setCustomCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState([
        'MARCAS', 'LOGOS', 'LETRAS', 'ANIMALES', 'DEPORTES',
        'INFANTIL', 'FLORAL', 'ESCUDOS', 'BANDERAS'
    ]);

    const FORMATS = ['DST', 'PES', 'JEF', 'XXX', 'EXP', 'HUS'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const toggleFormat = (fmt: string) => {
        setFormData(prev => {
            const current = prev.formatos || [];
            if (current.includes(fmt)) {
                return { ...prev, formatos: current.filter(f => f !== fmt) };
            } else {
                return { ...prev, formatos: [...current, fmt] };
            }
        });
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => {
            const current = prev.tags || [];
            if (current.includes(tag)) {
                return { ...prev, tags: current.filter(t => t !== tag) };
            } else {
                return { ...prev, tags: [...current, tag] };
            }
        });
    };

    const addCustomCategory = (e: React.MouseEvent) => {
        e.preventDefault();
        const trimmed = customCategory.trim().toUpperCase();
        if (!trimmed) return;

        if (!availableCategories.includes(trimmed)) {
            setAvailableCategories(prev => [...prev, trimmed]);
        }

        // Auto-select the new category
        setFormData(prev => {
            const current = prev.tags || [];
            if (!current.includes(trimmed)) {
                return { ...prev, tags: [...current, trimmed] };
            }
            return prev;
        });

        setCustomCategory('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        const data = new FormData();
        data.append('nombre', formData.nombre || '');
        data.append('description', formData.description || '');
        data.append('precio', String(formData.precio || 0));
        data.append('puntadas', String(formData.puntadas || 0));
        data.append('ancho_mm', String(formData.ancho_mm || 0));
        data.append('alto_mm', String(formData.alto_mm || 0));
        data.append('colores', String(formData.colores || 1));

        // Append formats individually
        formData.formatos?.forEach(fmt => data.append('formatos', fmt));

        // Append tags individually
        formData.tags?.forEach(tag => data.append('tags', tag));

        // Append Files
        if (formData.imageFile) data.append('imageFile', formData.imageFile);
        if (formData.zipFile) data.append('zipFile', formData.zipFile);

        try {
            const result = await createProduct(data);
            if (result.success) {
                setSaved(true);
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert("Error al enviar el formulario.");
        } finally {
            setIsPending(false);
        }
    };

    if (saved) {
        return (
            <motion.div initial={{ scale: 0.8, rotate: -2 }} animate={{ scale: 1, rotate: 0 }} className="bg-brand-yellow border-4 border-brand-dark p-8 neo-shadow max-w-md mx-auto text-center transform rotate-2">
                <div className="border-b-4 border-brand-dark pb-4 mb-4 border-dashed">
                    <h2 className="font-serif font-black text-2xl">TICKET DE ALTA EXITOSA</h2>
                </div>
                <p className="font-mono text-xl font-bold mb-2">{formData.nombre}</p>
                <div className="font-mono text-sm space-y-2 mb-6 text-left">
                    <p>PRECIO: ${formData.precio}</p>
                    <p>STATUS: GUARDADO EN DB ✅</p>
                </div>
                <button
                    onClick={() => { setSaved(false); setFormData({ formatos: [], tags: [] }); }}
                    className="w-full bg-brand-dark text-white font-mono font-bold py-3 hover:bg-brand-green"
                >
                    CARGAR OTRO
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white border-4 border-brand-dark p-6 neo-shadow">
            <h2 className="font-serif font-black text-2xl text-brand-green mb-6 flex items-center gap-2">
                <Tag className="w-8 h-8" /> NUEVO PRODUCTO
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                {/* 1. INFO BASICA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="font-bold text-sm">NOMBRE DE LA MATRIZ</label>
                        <input
                            name="nombre"
                            onChange={handleChange}
                            className="w-full border-2 border-brand-dark p-3 focus:ring-4 focus:ring-brand-green/20 outline-none"
                            placeholder="EJ: NIKE VINTAGE..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-bold text-sm">PRECIO (ARS)</label>
                        <input
                            name="precio" type="number"
                            onChange={handleChange}
                            className="w-full border-2 border-brand-dark p-3 focus:ring-4 focus:ring-brand-green/20 outline-none"
                            placeholder="$0.00"
                        />
                    </div>
                </div>

                {/* 1.5 DESCRIPCION & TAGS */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="font-bold text-sm">DESCRIPCIÓN</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            rows={3}
                            className="w-full border-2 border-brand-dark p-3 focus:ring-4 focus:ring-brand-green/20 outline-none resize-none"
                            placeholder="Detalles sobre el diseño, recomendaciones de bordado, etc..."
                        />
                    </div>

                    <div>
                        <label className="font-bold text-sm block mb-2">CATEGORÍAS / ETIQUETAS</label>

                        {/* Custom Category Input */}
                        <div className="flex gap-2 mb-3">
                            <input
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                className="border-2 border-brand-dark p-2 text-sm outline-none w-full md:w-1/2"
                                placeholder="NUEVA CATEGORÍA..."
                            />
                            <button
                                onClick={addCustomCategory}
                                className="bg-brand-dark text-white px-4 py-2 font-bold text-sm hover:bg-brand-green transition-colors"
                            >
                                CREAR
                            </button>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {availableCategories.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`
                                        px-3 py-1 font-bold border-2 border-brand-dark text-xs transition-all uppercase
                                        ${formData.tags?.includes(tag) ? 'bg-brand-orange text-brand-dark shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-100'}
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. SPECS TECNICAS */}
                <div className="p-4 bg-brand-bg border-2 border-brand-dark grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="text-xs font-bold block mb-1">ANCHO (mm)</label>
                        <input name="ancho_mm" type="number" onChange={handleChange} className="w-full p-2 border-2 border-brand-dark" placeholder="0" />
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1">ALTO (mm)</label>
                        <input name="alto_mm" type="number" onChange={handleChange} className="w-full p-2 border-2 border-brand-dark" placeholder="0" />
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1">PUNTADAS</label>
                        <input name="puntadas" type="number" onChange={handleChange} className="w-full p-2 border-2 border-brand-dark" placeholder="0" />
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1">COLORES</label>
                        <input name="colores" type="number" onChange={handleChange} className="w-full p-2 border-2 border-brand-dark" placeholder="1" />
                    </div>
                </div>

                {/* 3. FORMATOS */}
                <div>
                    <label className="font-bold text-sm block mb-2">FORMATOS INCLUIDOS</label>
                    <div className="flex gap-2 flex-wrap">
                        {FORMATS.map(fmt => (
                            <button
                                key={fmt}
                                type="button"
                                onClick={() => toggleFormat(fmt)}
                                className={`
                                    px-3 py-1 font-bold border-2 border-brand-dark text-xs transition-all
                                    ${formData.formatos?.includes(fmt) ? 'bg-brand-green text-white shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-100'}
                                `}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. ARCHIVOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-bold text-sm block mb-2">IMAGEN DE PORTADA</label>
                        <NeobrutalUploader onFileSelect={(f) => setFormData(prev => ({ ...prev, imageFile: f }))} />
                        {formData.imageFile && <p className="text-xs font-bold text-brand-green mt-1">✓ IMG CARGADA: {formData.imageFile.name}</p>}
                    </div>
                    <div>
                        <label className="font-bold text-sm block mb-2">ARCHIVO FUENTE (.ZIP)</label>
                        <NeobrutalZipUploader onFileSelect={(f) => setFormData(prev => ({ ...prev, zipFile: f }))} />
                        {formData.zipFile && <p className="text-xs font-bold text-brand-green mt-1">✓ ZIP CARGADO: {formData.zipFile.name}</p>}
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    disabled={isPending}
                    className="w-full bg-brand-green text-white border-4 border-brand-dark py-4 text-xl font-black hover:bg-brand-dark transition-colors flex justify-center items-center gap-2 neo-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'GUARDANDO...' : <><Save /> GUARDAR & PUBLICAR</>}
                </button>
            </form>
        </div>
    );
}
