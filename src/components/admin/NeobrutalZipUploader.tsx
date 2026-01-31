'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileArchive, Loader2, Check } from 'lucide-react';

interface NeobrutalZipUploaderProps {
    onFileSelect: (file: File) => void;
    label?: string;
}

export default function NeobrutalZipUploader({ onFileSelect, label = "SUBIR HILO DIGITAL (.ZIP)" }: NeobrutalZipUploaderProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (file.size > 50 * 1024 * 1024) {
            alert("¡ARCHIVO MUY PESADO! MÁXIMO 50MB.");
            return;
        }
        setFileName(file.name);
        setStatus('uploading');
        onFileSelect(file);
    };

    useEffect(() => {
        if (status === 'uploading') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('success');
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [status]);

    const stripedBackground = {
        backgroundImage: `repeating-linear-gradient(45deg, #0F5F3D, #0F5F3D 20px, #FA8112 20px, #FA8112 40px)`,
        backgroundSize: '200% 100%',
    };

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept=".zip,.rar"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => inputRef.current?.click()}
                        className="border-4 border-dashed border-brand-green bg-brand-bg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-green/10 transition-colors"
                    >
                        <Upload className="w-8 h-8 text-brand-green mb-2" />
                        <span className="font-mono font-bold text-brand-green">{label}</span>
                    </motion.div>
                )}

                {status === 'uploading' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-4 border-brand-green bg-white p-4">
                        <div className="flex justify-between font-mono font-bold text-xs mb-2">
                            <span>CARGANDO MATRIZ...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-4 w-full border-2 border-brand-dark overflow-hidden">
                            <motion.div
                                className="h-full"
                                style={{ ...stripedBackground, width: `${progress}%` }}
                                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="border-4 border-brand-green bg-brand-green text-white p-4 flex items-center gap-4">
                        <div className="bg-white text-brand-green p-2 border-2 border-black rounded-full">
                            <FileArchive className="w-6 h-6" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-mono font-bold truncate">{fileName}</p>
                            <p className="font-mono text-xs opacity-80">LISTO PARA DEPLOY</p>
                        </div>
                        <button onClick={() => setStatus('idle')} className="ml-auto hover:text-black"><Check /></button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
