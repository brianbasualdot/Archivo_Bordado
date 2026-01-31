'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, Lock, ChevronRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('INITIATING_HANDSHAKE...');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setMessage('ACCESS_DENIED: INVALID CREDENTIALS');
                setLoading(false);
            } else {
                setMessage('ACCESS_GRANTED. WELCOME ADMIN.');
                setTimeout(() => {
                    router.push('/embro/dash/pedidos');
                }, 1000);
            }
        } catch (error) {
            setMessage('SYSTEM_FAILURE');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-4">

            {/* MARQUEE */}
            <div className="fixed top-0 left-0 w-full bg-brand-dark text-brand-green overflow-hidden py-2 z-50">
                <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="whitespace-nowrap font-mono font-bold text-sm"
                >
                    *** ADVERTENCIA: NIVEL DE SEGURIDAD 5 *** ACCESO RESTRINGIDO SOLO A PERSONAL AUTORIZADO *** IP REGISTRADA Y MONITOREADA ***
                </motion.div>
            </div>

            {/* LOGIN TERMINAL */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md bg-white border-4 border-brand-dark neo-shadow p-8 relative"
            >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-brand-yellow border-2 border-brand-dark px-4 py-1 neo-shadow rotate-1">
                    <span className="font-serif font-black text-brand-dark">SYSTEM_LOGIN</span>
                </div>

                <div className="flex flex-col gap-6 mt-4">
                    <div className="flex items-center gap-3 border-b-2 border-brand-dark pb-2">
                        <Terminal className="w-6 h-6 text-brand-dark" />
                        <h1 className="font-mono font-bold text-xl">MAINFRAME_ACCESS</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="font-mono font-bold text-sm block">IDENTIFICADOR (EMAIL)</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-100 border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-green"
                                    placeholder="admin@archivo.com"
                                />
                                <Lock className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-mono font-bold text-sm block">PASSWORD</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-100 border-2 border-brand-dark p-3 font-mono focus:outline-none focus:ring-2 focus:ring-brand-green"
                                    placeholder="********"
                                />
                                <Lock className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="h-12 flex items-center justify-center">
                            {message && (
                                <p className={`font-mono text-xs font-bold animate-pulse ${message.includes('GRANTED') ? 'text-brand-green' : 'text-brand-orange'}`}>
                                    {'>'} {message}
                                </p>
                            )}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-brand-dark text-white border-2 border-transparent py-4 font-mono font-bold hover:bg-brand-green hover:text-brand-dark hover:border-brand-dark transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? 'PROCESANDO...' : 'SOLICITAR ACCESO'}
                            {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center border-t-2 border-brand-dark/20 pt-4">
                    <p className="font-mono text-[10px] text-gray-400">
                        SECURE CONNECTION ESTABLISHED. V.2.0.4
                    </p>
                </div>
            </motion.div>

        </div>
    );
}
