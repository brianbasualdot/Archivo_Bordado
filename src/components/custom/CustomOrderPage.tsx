'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileUp, CheckCircle2, Scissors, Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import NeobrutalUploader from './NeobrutalUploader';

export default function CustomOrderPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        file: null as File | null,
        width: '',
        height: '',
        fabric: 'algodon',
        email: '',
        notes: '',
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
            {/* HEADER */}
            <div className="mb-12 text-center space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl font-black text-brand-dark bg-brand-pink border-4 border-brand-dark px-6 py-2 inline-block transform -rotate-2 neo-shadow">
                    DIGITALIZACIÓN_A_MEDIDA
                </h1>
                <p className="font-mono text-brand-dark/70 text-sm md:text-base max-w-lg mx-auto">
                    Servicio premium de conversión de imagen a matriz de bordado.
                    Procesamiento seguro y optimización técnica incluída.
                </p>
            </div>

            {/* STEPS INDICATOR */}
            <div className="flex justify-center items-center gap-2 mb-12">
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`w-12 h-12 flex items-center justify-center border-2 border-brand-dark font-mono font-bold transition-all ${step === s ? 'bg-brand-pink text-brand-dark neo-shadow -translate-y-1' : step > s ? 'bg-brand-green text-white' : 'bg-white text-gray-400'}`}
                    >
                        {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                ))}
                <div className="h-1 bg-brand-dark flex-grow max-w-[100px] mx-4" />
                <span className="font-mono font-bold text-brand-pink">
                    PASO {step}/4
                </span>
            </div>

            {/* FORM CONTENT */}
            <div className="relative min-h-[400px] bg-brand-bg border-4 border-brand-dark neo-shadow p-8 mb-8 overflow-hidden">

                <AnimatePresence mode="wait">

                    {/* STEP 1: UPLOAD (Neobrutal) */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex flex-col items-center justify-center py-8"
                        >
                            <NeobrutalUploader
                                onFileSelect={(file) => setFormData({ ...formData, file })}
                                onUploadComplete={() => {
                                    setTimeout(() => setStep(2), 1000); // Wait a bit after success to auto-advance
                                }}
                            />
                        </motion.div>
                    )}

                    {/* STEP 2: SPECS */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                                <Scissors className="text-brand-pink" />
                                ESPECIFICACIONES TÉCNICAS
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-mono font-bold block">ANCHO (CM)</label>
                                    <input
                                        type="number"
                                        className="w-full border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink neo-shadow"
                                        placeholder="Ej: 12"
                                        value={formData.width}
                                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-mono font-bold block">ALTO (CM)</label>
                                    <input
                                        type="number"
                                        className="w-full border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink neo-shadow"
                                        placeholder="Ej: 15"
                                        value={formData.height}
                                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono font-bold block">TIPO DE TELA</label>
                                <select
                                    className="w-full border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink neo-shadow bg-white"
                                    value={formData.fabric}
                                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                                >
                                    <option value="algodon">ALGODÓN / JERSEY (Remeras)</option>
                                    <option value="denim">DENIM / GABARDINA (Camperas)</option>
                                    <option value="piquet">PIQUÉ (Chombas)</option>
                                    <option value="gorra">GORRA / KEPÍ (Estructurada)</option>
                                </select>
                            </div>

                            <div className="flex justify-between pt-8">
                                <button onClick={prevStep} className="px-6 py-2 border-2 border-brand-dark font-mono hover:bg-gray-100 flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> ATRÁS
                                </button>
                                <button onClick={nextStep} className="px-6 py-2 bg-brand-pink border-2 border-brand-dark font-mono font-bold neo-shadow hover:neo-shadow-hover transition-all flex items-center gap-2">
                                    CONTINUAR <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: CONTACT */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                                <Mail className="text-brand-pink" />
                                DATOS DE CONTACTO
                            </h2>

                            <div className="space-y-2">
                                <label className="font-mono font-bold block">EMAIL DESTINO</label>
                                <input
                                    type="email"
                                    className="w-full border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink neo-shadow"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <p className="text-xs font-mono text-gray-500">* Recibirás la matriz en este correo.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono font-bold block">NOTAS ADICIONALES</label>
                                <textarea
                                    className="w-full h-32 border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink neo-shadow resize-none"
                                    placeholder="Ej: 'Por favor simplificar los colores...'"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-between pt-8">
                                <button onClick={prevStep} className="px-6 py-2 border-2 border-brand-dark font-mono hover:bg-gray-100 flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> ATRÁS
                                </button>
                                <button onClick={nextStep} className="px-6 py-2 bg-brand-pink border-2 border-brand-dark font-mono font-bold neo-shadow hover:neo-shadow-hover transition-all flex items-center gap-2">
                                    REVISAR PEDIDO <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: SUMMARY (TICKET) */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-full max-w-md bg-white border-2 border-brand-dark p-6 neo-shadow relative mb-8">
                                {/* Ticket Holes Visualization (CSS) would go here ideally */}
                                <div className="border-b-2 border-dashed border-brand-dark pb-4 mb-4 text-center">
                                    <h3 className="font-serif text-2xl font-black uppercase">TICKET DE PEDIDO</h3>
                                    <p className="font-mono text-xs text-gray-400">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                </div>

                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">ARCHIVO:</span>
                                        <span className="font-bold truncate max-w-[150px]">{formData.file?.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">MEDIDAS:</span>
                                        <span className="font-bold">{formData.width}cm x {formData.height}cm</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">TELA:</span>
                                        <span className="font-bold uppercase">{formData.fabric}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">EMAIL:</span>
                                        <span className="font-bold">{formData.email}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t-2 border-brand-dark flex justify-between items-center">
                                    <span className="font-bold font-serif min-w-[35px]">TOTAL</span>
                                    <span className="font-bold font-mono text-xl text-brand-orange">$15.00</span>
                                </div>
                            </div>

                            <div className="flex gap-4 w-full justify-center">
                                <button onClick={prevStep} className="px-6 py-3 border-2 border-brand-dark font-mono hover:bg-gray-100">
                                    CORREGIR
                                </button>
                                <button className="flex-grow max-w-xs px-6 py-3 bg-brand-green text-white border-2 border-brand-dark font-mono font-bold neo-shadow hover:neo-shadow-hover transition-all flex items-center justify-center gap-2">
                                    <FileUp className="w-5 h-5" /> CONFIRMAR Y PAGAR
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

            </div>
        </div>
    );
}
