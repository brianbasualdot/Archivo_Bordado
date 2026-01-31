'use client';

import { useState } from 'react';
import { Check, FileText, AlertTriangle, RefreshCw, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data (Cleaned)
const TRANSACTIONS: { id: string, user: string, amount: number, method: string, status: string, date: string, discount?: boolean, alert?: boolean }[] = [];

export default function VentasPage() {
    const [sales, setSales] = useState(TRANSACTIONS);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        // Simulate Server Action delay
        setTimeout(() => {
            setSales(prev => prev.map(s => s.id === id ? { ...s, status: 'APROBADO' } : s));
            setProcessingId(null);
        }, 1500);
    };

    const handleResend = (id: string) => {
        alert(`Reenviando mail con archivos para la orden ${id}...`);
    };

    const openInvoice = (id: string) => {
        // In real app, open a dynamic route like /embro/dash/factura/${id}
        window.open(`/embro/dash/factura/${id}`, '_blank');
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-end mb-6 border-b-4 border-brand-orange pb-2">
                <h2 className="font-serif font-black text-3xl">REGISTRO DE VENTAS</h2>
                <div className="font-mono text-sm bg-brand-orange px-2 py-1 border-2 border-brand-dark">
                    TOTAL MES: $0
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-4 border-brand-dark font-mono text-sm bg-brand-bg">
                    <thead className="bg-brand-dark text-white">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">USUARIO</th>
                            <th className="p-3 text-left">MÉTODO</th>
                            <th className="p-3 text-right">MONTO</th>
                            <th className="p-3 text-center">ESTADO</th>
                            <th className="p-3 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 ? sales.map((sale) => (
                            <motion.tr
                                key={sale.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`
                            border-b-2 border-brand-dark hover:bg-white transition-colors
                            ${sale.alert ? 'bg-red-100' : ''}
                        `}
                            >
                                <td className="p-3 font-bold border-r-2 border-brand-dark">{sale.id}</td>
                                <td className="p-3 border-r-2 border-brand-dark">{sale.user}</td>
                                <td className="p-3 border-r-2 border-brand-dark">
                                    <span className="text-xs font-bold">{sale.method}</span>
                                    {sale.discount && <span className="ml-2 text-[10px] bg-brand-green text-white px-1">-10%</span>}
                                </td>
                                <td className="p-3 text-right font-bold border-r-2 border-brand-dark">
                                    ${sale.amount.toLocaleString()}
                                </td>
                                <td className="p-3 text-center border-r-2 border-brand-dark">
                                    {sale.status === 'APROBADO' ? (
                                        <span className="bg-brand-green text-white px-2 py-1 text-xs font-bold">APROBADO</span>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="bg-brand-yellow text-brand-dark px-2 py-1 text-xs font-bold neo-shadow">PENDIENTE</span>
                                            {sale.alert && (
                                                <span className="mt-1 flex items-center gap-1 text-[10px] text-red-600 font-bold animate-pulse">
                                                    <AlertTriangle className="w-3 h-3" /> DEMORADO
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center gap-2">
                                        {sale.status === 'PENDIENTE' && sale.method === 'TRANSFERENCIA' && (
                                            <button
                                                onClick={() => handleApprove(sale.id)}
                                                disabled={!!processingId}
                                                className="p-2 bg-brand-green text-white border-2 border-brand-dark hover:scale-110 transition-transform neo-shadow"
                                                title="Aprobar Transferencia y Enviar Archivos"
                                            >
                                                {processingId === sale.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => openInvoice(sale.id)}
                                            className="p-2 bg-white text-brand-dark border-2 border-brand-dark hover:bg-gray-100 transition-colors"
                                            title="Ver Factura"
                                        >
                                            <Printer className="w-4 h-4" />
                                        </button>

                                        {sale.status === 'APROBADO' && (
                                            <button
                                                onClick={() => handleResend(sale.id)}
                                                className="p-2 bg-brand-pink text-brand-dark border-2 border-brand-dark hover:bg-brand-orange transition-colors"
                                                title="Reenviar Archivos"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center font-mono text-gray-500">
                                    NO HAY VENTAS REGISTRADAS
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
