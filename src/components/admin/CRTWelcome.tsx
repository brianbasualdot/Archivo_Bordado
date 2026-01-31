'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CRTWelcome() {
    const [visible, setVisible] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // 1. Expand line to screen
        setTimeout(() => setExpanded(true), 500);
        // 2. Hide animation after sequence
        setTimeout(() => setVisible(false), 3500);
    }, []);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                {/* CRT FLICKER & SCANLINES */}
                <div className="absolute inset-0 pointer-events-none z-20 animate-flicker bg-white/5 opacity-10" />
                <div className="absolute inset-0 pointer-events-none z-20 bg-scanlines opacity-20" />

                {/* EXPANDING LINE ANIMATION */}
                {!expanded ? (
                    <motion.div
                        initial={{ width: 0, height: 2 }}
                        animate={{ width: '100vw', height: 2 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="bg-green-500 shadow-[0_0_20px_rgba(0,255,0,0.8)]"
                    />
                ) : (
                    <motion.div
                        initial={{ height: 2 }}
                        animate={{ height: '100vh' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full bg-black relative flex items-center justify-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="font-mono font-bold text-4xl md:text-6xl text-[#00FF00] tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]"
                        >
                            HOLA, ESCLAV@! :)
                        </motion.h1>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
