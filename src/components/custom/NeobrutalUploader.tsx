'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, Loader2, Image as ImageIcon } from 'lucide-react';

interface NeobrutalUploaderProps {
    onFileSelect: (file: File) => void;
    onUploadComplete?: () => void;
}

export default function NeobrutalUploader({ onFileSelect, onUploadComplete }: NeobrutalUploaderProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return; // Simple validation
        setFileName(file.name);
        setStatus('uploading');
        setProgress(0);
        onFileSelect(file); // Fix: Propagate file to parent
    };

    // Simulate Upload Progress -> Processing -> Success
    useEffect(() => {
        if (status === 'uploading') {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('processing');
                        return 100;
                    }
                    return prev + Math.floor(Math.random() * 15) + 5; // increment by 5-20%
                });
            }, 300);
            return () => clearInterval(interval);
        }

        if (status === 'processing') {
            // Simulate Sharp processing time (2 seconds)
            const timeout = setTimeout(() => {
                setStatus('success');
                if (onUploadComplete) onUploadComplete();
                // Actually pass file up? Assuming we already have it in scope if needed, 
                // strictly for this component we just trigger onFileSelect at the end or start.
                // Usually start, but let's assume we call it at success for specific UX flow
                // OR we passed it at start. Let's call it NOW to update parent.
                // But we can't access 'file' here easily without state.
                // For now, assume parent handles 'real' logic, we just do visuals.
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    // Define the striped background via style
    const stripedBackground = {
        backgroundImage: `repeating-linear-gradient(
      45deg,
      #FF4EAD,
      #FF4EAD 20px,
      #FA8112 20px,
      #FA8112 40px,
      #FFD644 40px,
      #FFD644 60px,
      #0F5F3D 60px,
      #0F5F3D 80px
    )`,
        backgroundSize: '200% 100%',
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">

                {/* STATE: IDLE */}
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="
                relative h-64 w-full 
                border-4 border-dashed border-brand-dark 
                bg-white hover:bg-brand-pink/5 
                flex flex-col items-center justify-center 
                cursor-pointer transition-colors group
            "
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleInputChange}
                        />
                        <div className="bg-brand-bg border-2 border-brand-dark p-4 rounded-full mb-4 group-hover:scale-110 transition-transform neo-shadow">
                            <Upload className="w-8 h-8 text-brand-dark" />
                        </div>
                        <p className="font-mono font-bold text-xl text-brand-dark group-hover:text-brand-pink transition-colors">
                            ARRASTRAR IMAGEN
                        </p>
                        <p className="font-mono text-xs text-gray-400 mt-2">
                            Soporta: JPG, PNG, SVG
                        </p>
                    </motion.div>
                )}

                {/* STATE: UPLOADING or PROCESSING */}
                {(status === 'uploading' || status === 'processing') && (
                    <motion.div
                        key="uploading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full border-4 border-brand-dark bg-white p-6 neo-shadow"
                    >
                        <div className="flex justify-between items-end mb-2 font-mono font-bold">
                            <span className="text-brand-dark">
                                {status === 'uploading' ? 'SUBIENDO...' : 'PROCESANDO...'}
                            </span>
                            <span className="text-2xl text-brand-dark">
                                [{status === 'uploading' ? `${Math.min(progress, 100)}%` : '100%'}]
                            </span>
                        </div>

                        {/* PROGRESS BAR CONTAINER */}
                        <div className="w-full h-12 border-4 border-brand-dark bg-gray-200 overflow-hidden relative">
                            {/* ANIMATED BAR */}
                            <motion.div
                                className="h-full w-full"
                                style={{
                                    ...stripedBackground,
                                    width: `${progress}%`
                                    // For processing, we keep it 100% wide but animate the background position
                                }}
                                animate={
                                    status === 'processing'
                                        ? { backgroundPosition: ["0% 0%", "200% 0%"] }
                                        : { backgroundPosition: "0% 0%" }
                                }
                                transition={
                                    status === 'processing'
                                        ? { repeat: Infinity, duration: 1, ease: "linear" }
                                        : {}
                                }
                            />
                        </div>

                        <div className="mt-4 font-mono text-xs flex items-center gap-2 text-gray-500">
                            {status === 'processing' && <Loader2 className="w-4 h-4 animate-spin" />}
                            {status === 'processing'
                                ? 'ASEGURANDO Y OPTIMIZANDO IMAGEN...'
                                : 'Transfiriendo bytes seguros...'}
                        </div>
                    </motion.div>
                )}

                {/* STATE: SUCCESS */}
                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full border-4 border-brand-dark bg-brand-green/10 p-6 neo-shadow flex flex-col items-center text-center"
                    >
                        <div className="bg-brand-green text-white p-4 border-4 border-brand-dark neo-shadow mb-4">
                            <FileCheck className="w-12 h-12" />
                        </div>
                        <h3 className="font-serif text-2xl font-black text-brand-dark mb-1">
                            LISTO PARA BORDAR
                        </h3>
                        <p className="font-mono text-brand-green font-bold truncate max-w-full">
                            {fileName}
                        </p>
                        <button
                            onClick={() => {
                                // Reset for demo or let parent handle 'Next Step'
                                // For this component, maybe allow re-upload
                            }}
                            className="mt-6 text-xs font-mono underline hover:text-brand-pink"
                        >
                            Cambiar archivo
                        </button>
                        {/* Trigger parent callback effectively when done if needed, 
                    but simplistic for this isolated demo */}
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
