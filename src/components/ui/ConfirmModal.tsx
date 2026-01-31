'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
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
                    onClick={onCancel}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.9, opacity: 0, rotate: -2 }}
                    className="relative w-full max-w-sm bg-white border-4 border-brand-dark p-6 neo-shadow"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 text-red-500">
                        <AlertTriangle className="w-10 h-10" />
                        <h2 className="font-serif font-black text-2xl uppercase leading-none">
                            {title}
                        </h2>
                    </div>

                    {/* Body */}
                    <p className="font-mono text-gray-600 mb-8 font-bold text-sm">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 font-mono font-bold border-2 border-brand-dark bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            CANCELAR
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 font-mono font-bold border-2 border-brand-dark bg-red-500 text-white hover:bg-red-600 neo-shadow hover:shadow-none hover:translate-y-1 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? '...' : (
                                <>
                                    <Trash2 className="w-4 h-4" /> ELIMINAR
                                </>
                            )}
                        </button>
                    </div>

                    {/* Close Button top-right */}
                    <button
                        onClick={onCancel}
                        className="absolute -top-3 -right-3 bg-brand-dark text-white p-1 border-2 border-white hover:bg-red-500 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
