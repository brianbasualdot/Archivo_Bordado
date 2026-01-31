'use client';

import { useCart } from '@/context/CartContext';
import { Trash2, CreditCard, Lock, Plus } from 'lucide-react';
import Link from 'next/link';
import { ProductUI } from '@/types';
import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CheckoutStatusModal from '@/components/checkout/CheckoutStatusModal';
import { getRandomProduct } from '@/app/actions/store';
import { createPreference } from '@/app/actions/payments';

export default function CheckoutPage() {
    const { items, removeFromCart, addToCart, total } = useCart();
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'mp' | 'transfer'>('mp');


    // ...
    // Upsell State
    const [upsellProduct, setUpsellProduct] = useState<ProductUI | null>(null);

    // Modal State
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'loading' | 'success' | 'error' | 'idle';
        title?: string;
        message?: string;
        details?: string[];
    }>({ isOpen: false, type: 'idle' });

    // Fetch Upsell Product
    useEffect(() => {
        const fetchUpsell = async () => {
            const excludeIds = items.map(i => i.id);
            const product = await getRandomProduct(excludeIds);
            if (product) {
                setUpsellProduct(product);
            }
        };
        fetchUpsell();
    }, [items.length]); // Re-fetch if items change (e.g. if I add the upsell item)

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Open Loading Modal
        setModalState({
            isOpen: true,
            type: 'loading',
            title: 'PROCESANDO...',
            message: 'Estamos generando tu pedido, por favor espera un momento.'
        });

        if (paymentMethod === 'mp') {
            try {
                // Prepare items for MP
                const mpItems = items.map(item => ({
                    id: item.id,
                    title: item.title,
                    unit_price: item.price,
                    quantity: 1, // Digital goods usually 1
                    picture_url: item.imageUrl
                }));

                const result = await createPreference({
                    items: mpItems,
                    payerEmail: customerEmail,
                    payerName: customerName,
                    payerPhone: customerPhone
                });

                if (result.error) {
                    throw new Error(result.error);
                }

                if (result.init_point) {
                    setModalState({
                        isOpen: true,
                        type: 'success',
                        title: 'REDIRECCIONANDO',
                        message: 'Te estamos llevando a Mercado Pago para completar el pago seguro.',
                        details: [`Cliente: ${customerName}`, 'Aguarde unos segundos...']
                    });

                    // Redirect to Mercado Pago
                    window.location.href = result.init_point;
                }

            } catch (error) {
                console.error(error);
                setModalState({
                    isOpen: true,
                    type: 'error',
                    title: 'ERROR DE PAGO',
                    message: 'Hubo un problema al conectar con Mercado Pago.',
                    details: ['Por favor intenta nuevamente o elige Transferencia.']
                });
            }
        } else {
            // TODO: Create Pending Order for Transfer (Manual Approval)
            setTimeout(() => {
                setModalState({
                    isOpen: true,
                    type: 'success',
                    title: 'PEDIDO REGISTRADO',
                    message: '¡Gracias por tu compra! Por favor realiza la transferencia a los siguientes datos:',
                    details: [
                        '--------------------------------',
                        '🏦 BANCO: Mercado Pago / Santander',
                        '👤 TITULAR: Brian Basualdo',
                        '🔢 CBU/CVU: 000000310008475829103',
                        '🔖 ALIAS: bordado.archivo.mp',
                        '--------------------------------',
                        `Monto Total: $${total.toFixed(2)}`,
                        '--------------------------------',
                        '⚠️ IMPORTANTE:',
                        'Envía el comprobante por WhatsApp o Email.',
                        'También enviamos estos datos a tu correo.'
                    ]
                });
            }, 2000);
        }
    };

    const isProcessing = modalState.type === 'loading';

    return (
        <main className="min-h-screen flex flex-col bg-brand-bg">
            <Navbar />

            <CheckoutStatusModal
                isOpen={modalState.isOpen}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                details={modalState.details}
                onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
            />

            <div className="flex-grow max-w-[1440px] mx-auto w-full px-4 py-8 lg:py-16">
                <h1 className="font-serif text-4xl lg:text-5xl font-black text-brand-dark mb-12 text-center">
                    FINALIZAR COMPRA
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 border-4 border-dashed border-brand-dark bg-white">
                        <p className="font-mono text-xl text-gray-500 mb-6">TU CARRITO ESTÁ VACÍO</p>
                        <Link href="/catalogo">
                            <button className="bg-brand-green text-white font-mono font-bold py-3 px-8 border-2 border-brand-dark neo-shadow hover:translate-y-1 hover:shadow-none transition-all">
                                IR AL CATÁLOGO
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* 1. ORDER SUMMARY */}
                        <div className="space-y-6">
                            <h2 className="font-serif font-bold text-2xl flex items-center gap-2">
                                <span className="bg-brand-dark text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span>
                                RESUMEN DEL PEDIDO
                            </h2>
                            <div className="bg-white border-4 border-brand-dark p-6 neo-shadow space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center border-b-2 border-brand-dark/10 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            {item.imageUrl && (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover border-2 border-brand-dark" />
                                            )}
                                            <div>
                                                <h3 className="font-bold font-mono text-sm">{item.title}</h3>
                                                <p className="font-mono text-xs text-brand-green">LICENCIA COMERCIAL</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="font-mono font-bold">${item.price.toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t-4 border-dashed border-brand-dark pt-4 mt-4 flex justify-between items-center">
                                    <span className="font-serif font-black text-xl">TOTAL A PAGAR</span>
                                    <span className="font-mono font-black text-2xl text-brand-orange bg-brand-dark px-2 py-1 rotate-1">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* UPSELL SECTION */}
                            {upsellProduct && (
                                <div className="mt-8 border-4 border-brand-dark bg-brand-pink p-4 neo-shadow relative animate-pulse-slow">
                                    <div className="absolute -top-3 -right-3 bg-brand-yellow border-2 border-brand-dark px-2 py-1 font-mono text-xs font-bold rotate-6 neo-shadow">
                                        ¡AGREGA Y PROBÁ!
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {upsellProduct.imageUrl && (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={upsellProduct.imageUrl} alt={upsellProduct.title} className="w-20 h-20 object-cover border-2 border-brand-dark bg-white" />
                                        )}
                                        <div className="flex-grow">
                                            <h4 className="font-bold font-serif leading-tight">{upsellProduct.title}</h4>
                                            <p className="font-mono text-sm font-bold text-brand-dark/60">${upsellProduct.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart({
                                                id: upsellProduct.id,
                                                title: upsellProduct.title,
                                                price: upsellProduct.price,
                                                imageUrl: upsellProduct.imageUrl || ''
                                            })}
                                            className="bg-white p-2 border-2 border-brand-dark hover:bg-brand-green hover:text-white transition-colors"
                                            title="Agregar al carrito"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. PAYMENT & DETAILS */}
                        <div className="space-y-6">
                            <h2 className="font-serif font-bold text-2xl flex items-center gap-2">
                                <span className="bg-brand-dark text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
                                MÉTODO DE PAGO Y DATOS
                            </h2>
                            <form onSubmit={handlePayment} className="bg-brand-yellow border-4 border-brand-dark p-8 neo-shadow relative space-y-8">
                                <div className="absolute -top-4 -right-4 bg-white border-2 border-brand-dark px-3 py-1 font-mono text-xs font-bold neo-shadow flex items-center gap-1 text-green-600">
                                    <Lock className="w-3 h-3" /> SSL SECURE
                                </div>

                                {/* Payment Method Selector */}
                                <div className="space-y-4">
                                    <label className="font-mono font-bold text-sm block">ELIGE CÓMO PAGAR</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('mp')}
                                            className={`p-4 border-2 border-brand-dark font-bold font-mono text-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'mp'
                                                ? 'bg-brand-blue text-white shadow-none translate-y-1'
                                                : 'bg-white hover:bg-gray-50 neo-shadow'
                                                }`}
                                        >
                                            <CreditCard className="w-6 h-6" />
                                            MERCADO PAGO
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('transfer')}
                                            className={`p-4 border-2 border-brand-dark font-bold font-mono text-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'transfer'
                                                ? 'bg-brand-pink text-brand-dark shadow-none translate-y-1'
                                                : 'bg-white hover:bg-gray-50 neo-shadow'
                                                }`}
                                        >
                                            <span className="text-xl">🏦</span>
                                            TRANSFERENCIA
                                        </button>
                                    </div>

                                    {/* Info Box for Transfer */}
                                    {paymentMethod === 'transfer' && (
                                        <div className="bg-white border-2 border-brand-dark border-dashed p-4 text-sm font-mono text-brand-gray-500">
                                            <p className="mb-2"><strong>ℹ️ CÓMO FUNCIONA:</strong></p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Confirmas el pedido aquí.</li>
                                                <li>Te mostramos los datos bancarios (Alias/CBU).</li>
                                                <li>Envías el comprobante por WhatsApp/Email.</li>
                                                <li>Te enviamos los archivos manualmente.</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 border-t-2 border-brand-dark pt-6 border-dashed">
                                    <div>
                                        <label className="font-mono font-bold text-sm block mb-1">EMAIL (Para envío de archivos)</label>
                                        <input
                                            type="email"
                                            required
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            className="w-full border-2 border-brand-dark p-3 outline-none focus:ring-4 focus:ring-brand-dark/20"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-mono font-bold text-sm block mb-1">NOMBRE COMPLETO</label>
                                        <input
                                            type="text"
                                            required
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full border-2 border-brand-dark p-3 outline-none focus:ring-4 focus:ring-brand-dark/20"
                                            placeholder="Juan Perez"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-mono font-bold text-sm block mb-1">TELÉFONO (Opcional)</label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            className="w-full border-2 border-brand-dark p-3 outline-none focus:ring-4 focus:ring-brand-dark/20"
                                            placeholder="+54 9 11..."
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={isProcessing}
                                    className={`w-full text-white border-4 border-brand-dark py-4 text-xl font-black transition-colors flex justify-center items-center gap-3 neo-shadow disabled:opacity-50 disabled:cursor-not-allowed group 
                                        ${paymentMethod === 'mp' ? 'bg-brand-blue hover:bg-brand-dark' : 'bg-brand-pink text-brand-dark hover:bg-brand-dark hover:text-white'}
                                    `}
                                >
                                    {isProcessing ? 'PROCESANDO...' : (
                                        <>
                                            {paymentMethod === 'mp' ? 'PAGAR CON MERCADO PAGO' : 'CONFIRMAR PEDIDO (TRANSFERENCIA)'}
                                            {paymentMethod === 'mp' ? <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform" /> : <span className="text-2xl group-hover:scale-110 transition-transform">🏦</span>}
                                        </>
                                    )}
                                </button>
                                <p className="text-center font-mono text-xs mt-3 opacity-60">
                                    {paymentMethod === 'mp'
                                        ? "Serás redirigido a Mercado Pago para completar el pago de forma segura."
                                        : "Al confirmar, recibirás los datos para transferir y completar tu compra."
                                    }
                                </p>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
