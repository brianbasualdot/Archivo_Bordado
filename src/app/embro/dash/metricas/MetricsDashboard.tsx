'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ChevronUp, TrendingUp, DollarSign, Award } from 'lucide-react';

// MOCK DATA (Cleaned)
const SALES_DATA: { name: string, mp: number, transfer: number }[] = [];
const CATEGORY_DATA: { name: string, value: number }[] = [];
const TOP_PRODUCTS: { rank: number, name: string, sales: number, revenue: number }[] = [];

const COLORS = ['#FFD644', '#FA8112', '#0F5F3D', '#0047FF'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: { color: string, name: string, value: number }[], label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border-2 border-brand-dark p-2 neo-shadow font-mono text-xs">
                <p className="font-bold mb-1">{label}</p>
                {payload.map((p, idx) => (
                    <p key={idx} style={{ color: p.color }}>
                        {p.name}: ${p.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function MetricsDashboard() {
    const [openSection, setOpenSection] = useState<'SALES' | 'CATEGORIES' | 'TOP' | null>('SALES');

    const toggleSection = (section: 'SALES' | 'CATEGORIES' | 'TOP') => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="flex flex-col gap-6 pb-8">

            <h2 className="font-serif font-black text-3xl flex items-center gap-2 mb-4">
                <TrendingUp className="w-8 h-8 text-brand-orange" />
                INTELIGENCIA DE NEGOCIO
            </h2>

            {/* 1. SALES CHART ACCORDION */}
            <div className="border-4 border-brand-dark bg-white neo-shadow">
                <button
                    onClick={() => toggleSection('SALES')}
                    className={`w-full flex justify-between items-center p-4 font-bold font-mono text-xl border-b-4 border-brand-dark transition-colors ${openSection === 'SALES' ? 'bg-brand-yellow' : 'bg-gray-100 hover:bg-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-6 h-6" /> VENTAS (MP vs TRANSFER)
                    </div>
                    {openSection === 'SALES' ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence>
                    {openSection === 'SALES' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-brand-bg"
                        >
                            <div className="p-6 h-[400px]">
                                {SALES_DATA.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={SALES_DATA}>
                                            <XAxis dataKey="name" stroke="#222" tick={{ fontFamily: 'monospace' }} />
                                            <YAxis stroke="#222" tick={{ fontFamily: 'monospace' }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar dataKey="mp" name="Mercado Pago" fill="#0047FF" stackId="a" stroke="#222" strokeWidth={2} />
                                            <Bar dataKey="transfer" name="Transferencia (-10%)" fill="#0F5F3D" stackId="a" stroke="#222" strokeWidth={2} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400 font-mono">NO DATA</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 2. CATEGORIES CHART ACCORDION */}
            <div className="border-4 border-brand-dark bg-white neo-shadow">
                <button
                    onClick={() => toggleSection('CATEGORIES')}
                    className={`w-full flex justify-between items-center p-4 font-bold font-mono text-xl border-b-4 border-brand-dark transition-colors ${openSection === 'CATEGORIES' ? 'bg-brand-orange' : 'bg-gray-100 hover:bg-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-dark rounded-full" /> DISTRIBUCIÓN POR CATEGORÍA
                    </div>
                    {openSection === 'CATEGORIES' ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence>
                    {openSection === 'CATEGORIES' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-brand-bg"
                        >
                            <div className="p-6 h-[400px] flex justify-center items-center">
                                {CATEGORY_DATA.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={CATEGORY_DATA}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }: { name?: string | number, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                                outerRadius={140}
                                                fill="#8884d8"
                                                dataKey="value"
                                                stroke="#222"
                                                strokeWidth={3}
                                            >
                                                {CATEGORY_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="text-gray-400 font-mono">NO DATA</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 3. TOP PRODUCTS TABLE */}
            <div className="border-4 border-brand-dark bg-white neo-shadow">
                <button
                    onClick={() => toggleSection('TOP')}
                    className={`w-full flex justify-between items-center p-4 font-bold font-mono text-xl border-b-4 border-brand-dark transition-colors ${openSection === 'TOP' ? 'bg-brand-green text-white' : 'bg-gray-100 hover:bg-white'}`}
                >
                    <div className="flex items-center gap-2">
                        <Award className="w-6 h-6" /> RANKING DE PRODUCTOS (TOP 5)
                    </div>
                    {openSection === 'TOP' ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence>
                    {openSection === 'TOP' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-brand-bg"
                        >
                            <div className="p-6">
                                {TOP_PRODUCTS.length > 0 ? (
                                    <table className="w-full border-collapse border-2 border-brand-dark font-mono text-sm">
                                        <thead>
                                            <tr className="bg-brand-dark text-white">
                                                <th className="p-3 border border-gray-600 text-left">RANK</th>
                                                <th className="p-3 border border-gray-600 text-left">IMAGEN</th>
                                                <th className="p-3 border border-gray-600 text-left">NOMBRE</th>
                                                <th className="p-3 border border-gray-600 text-right">VENTAS</th>
                                                <th className="p-3 border border-gray-600 text-right">REVENUE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TOP_PRODUCTS.map((prod) => (
                                                <tr key={prod.rank} className="bg-white hover:bg-brand-yellow/20">
                                                    <td className="p-3 border-2 border-brand-dark font-black text-center">{prod.rank}</td>
                                                    <td className="p-3 border-2 border-brand-dark">
                                                        <div className="w-10 h-10 bg-gray-200 border border-brand-dark" />
                                                    </td>
                                                    <td className="p-3 border-2 border-brand-dark font-bold">{prod.name}</td>
                                                    <td className="p-3 border-2 border-brand-dark text-right text-brand-orange font-bold">{prod.sales}</td>
                                                    <td className="p-3 border-2 border-brand-dark text-right text-brand-green font-bold">${prod.revenue.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-4 text-center font-mono text-gray-500">NO SALES DATA</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
