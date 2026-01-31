'use client';

import { CheckCircle, Download, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status'); // 'approved' usually

    // Clear cart on success
    const { clearCart } = useCart();

    useEffect(() => {
        if (orderId || paymentId) {
            clearCart();
        }
    }, [orderId, paymentId, clearCart]);

    return (
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center">
            <div className="bg-brand-green/20 p-6 rounded-full mb-8 neo-shadow animate-bounce-slow">
                <CheckCircle className="w-24 h-24 text-brand-green" />
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl font-black text-brand-dark mb-6">
                ¡PAGO EXITOSO!
            </h1>

            <div className="max-w-xl mx-auto space-y-6">
                <p className="font-mono text-xl text-gray-700">
                    Tu orden <span className="font-bold bg-brand-yellow px-2 border-2 border-brand-dark">{orderId ? `#${orderId.slice(-6)}` : 'CONFIRMADA'}</span> ha sido procesada correctamente.
                </p>

                <div className="bg-white border-4 border-brand-dark p-8 neo-shadow space-y-4">
                    <h3 className="font-serif font-bold text-2xl flex items-center justify-center gap-2">
                        <Mail className="w-6 h-6" />
                        REVISA TU EMAIL
                    </h3>
                    <p className="font-mono text-sm leading-relaxed">
                        Te hemos enviado un correo con los enlaces de descarga de tus archivos .ZIP y la factura de compra.
                        <br /><br />
                        <span className="text-red-500 font-bold">Importante:</span> Si no lo ves, revisa la carpeta de SPAM.
                    </p>
                </div>

                {paymentId && (
                    <p className="font-mono text-xs text-gray-400">ID de Transacción: {paymentId}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link href="/">
                        <button className="bg-brand-dark text-white font-mono font-bold py-3 px-8 border-2 border-brand-dark neo-shadow hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            IR AL INICIO
                        </button>
                    </Link>
                    {/* Placeholder for direct download if we want to implement it later */}
                    {/* 
                    <button className="bg-brand-blue text-white font-mono font-bold py-3 px-8 border-2 border-brand-dark neo-shadow hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        DESCARGAR AHORA
                    </button> 
                    */}
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen flex flex-col bg-brand-bg relative overflow-hidden">
            {/* Confetti Background Effect (CSS only usually, or simple svgs) */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
                backgroundSize: '24px 24px'
            }}></div>

            <Navbar />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center font-mono font-bold">CARGANDO...</div>}>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
}
