'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, Copy } from 'lucide-react';

interface CheckoutStatusModalProps {
    isOpen: boolean;
    type: 'loading' | 'success' | 'error' | 'idle';
    title?: string;
    message?: string;
    details?: string[];
    onClose?: () => void;
}

export default function CheckoutStatusModal({ isOpen, type, title, message, details, onClose }: CheckoutStatusModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
                    className={`
                        relative w-full max-w-md bg-white border-4 border-brand-dark p-6 neo-shadow
                        ${type === 'success' ? 'border-brand-green' : type === 'error' ? 'border-red-500' : 'border-brand-dark'}
                    `}
                >
                    {/* Header Bar */}
                    <div className={`
                        -mx-6 -mt-6 mb-6 p-4 border-b-4 border-brand-dark flex items-center justify-center gap-2
                        ${type === 'loading' ? 'bg-brand-yellow' : ''}
                        ${type === 'success' ? 'bg-brand-green text-white' : ''}
                        ${type === 'error' ? 'bg-red-500 text-white' : ''}
                    `}>
                        {type === 'loading' && <Loader2 className="w-6 h-6 animate-spin" />}
                        {type === 'success' && <CheckCircle className="w-8 h-8" />}
                        {type === 'error' && <XCircle className="w-8 h-8" />}

                        <h2 className="font-serif font-black text-xl uppercase tracking-wider">
                            {title || (type === 'loading' ? 'PROCESANDO...' : type === 'success' ? '¡LISTO!' : 'ERROR')}
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="text-center space-y-4">
                        <p className="font-mono text-lg font-bold">{message}</p>

                        {details && details.length > 0 && (
                            <div className="bg-gray-100 border-2 border-brand-dark border-dashed p-4 text-left font-mono text-sm space-y-1">
                                {details.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        )}

                        {type !== 'loading' && onClose && (
                            <button
                                onClick={onClose}
                                className="w-full mt-4 bg-brand-dark text-white font-mono font-bold py-3 hover:bg-brand-orange hover:text-brand-dark transition-colors neo-shadow"
                            >
                                {type === 'success' ? 'ENTENDIDO' : 'CERRAR'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
