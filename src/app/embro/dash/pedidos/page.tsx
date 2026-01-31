'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AlertCircle, Check, X, Eye } from 'lucide-react';

// MOCK ORDERS
// MOCK ORDERS (Cleaned)
const ORDERS: { id: string, user: string, type: string, status: string, date: string, alert?: boolean }[] = [];

export default function PedidosPage() {
    const controls = useAnimation();
    const [orders, setOrders] = useState(ORDERS);

    // Shake animation for new urgent orders
    useEffect(() => {
        const hasAlert = orders.some(o => o.alert);
        if (hasAlert) {
            const interval = setInterval(() => {
                controls.start({
                    x: [0, -5, 5, -5, 5, 0],
                    transition: { duration: 0.5 }
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [orders, controls]);

    return (
        <div className="h-full flex flex-col">
            <h2 className="font-serif font-black text-3xl mb-6 border-b-4 border-brand-yellow inline-block">
                GESTIÓN DE PEDIDOS
            </h2>

            {/* ALERT BOX (Old OS Style) */}
            {orders.some(o => o.alert) && (
                <motion.div
                    animate={controls}
                    className="bg-brand-pink border-4 border-brand-dark p-4 mb-8 flex items-start gap-4 neo-shadow"
                >
                    <div className="bg-white border-2 border-brand-dark p-2 rounded-full">
                        <AlertCircle className="w-8 h-8 text-brand-pink" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl font-mono uppercase">¡NUEVO PEDIDO PERSONALIZADO!</h3>
                        <p className="font-mono text-sm mb-2">Se requiere revisión de archivo y cotización.</p>
                        <button className="bg-brand-dark text-white px-4 py-1 font-mono text-xs hover:bg-black">
                            VER AHORA
                        </button>
                    </div>
                </motion.div>
            )}

            {/* ORDERS LIST */}
            <div className="space-y-4">
                {orders.length > 0 ? orders.map((order) => (
                    <div key={order.id} className="border-2 border-brand-dark p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-black font-mono text-lg">{order.id}</span>
                            <span className="text-xs font-mono text-gray-500">{order.date}</span>
                        </div>

                        <div className="flex-grow px-8">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 text-xs font-bold border-2 border-brand-dark ${order.type === 'PERSONALIZADO' ? 'bg-brand-pink' : 'bg-brand-yellow'}`}>
                                    {order.type}
                                </span>
                                <span className="font-mono text-sm">{order.user}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {order.status === 'PENDIENTE' ? (
                                <div className="flex gap-2">
                                    <button className="p-2 border-2 border-brand-dark bg-white hover:bg-gray-100" title="Ver Detalles">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 border-2 border-brand-dark bg-brand-green text-white hover:opacity-90" title="Aprobar">
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 border-2 border-brand-dark bg-red-500 text-white hover:opacity-90" title="Rechazar">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <span className="font-mono font-bold text-brand-green flex items-center gap-1">
                                    <Check className="w-4 h-4" /> COMPLETADO
                                </span>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="p-8 text-center border-2 border-dashed border-brand-dark text-gray-400 font-mono">
                        NO HAY PEDIDOS RECIENTES
                    </div>
                )}
            </div>
        </div>
    );
}
