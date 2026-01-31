'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, DollarSign, Package, MessageSquare, LogOut, Globe, TrendingUp } from 'lucide-react';
import { signOut } from 'next-auth/react';

import CRTWelcome from '@/components/admin/CRTWelcome';

const TABS = [
    { name: 'PEDIDOS', href: '/embro/dash/pedidos', color: 'bg-brand-yellow', icon: FileText },
    { name: 'VENTAS', href: '/embro/dash/ventas', color: 'bg-brand-orange', icon: DollarSign },
    { name: 'PRODUCTOS', href: '/embro/dash/productos', color: 'bg-brand-green', icon: Package, text: 'text-white' },
    { name: 'MENSAJES', href: '/embro/dash/mensajes', color: 'bg-brand-pink', icon: MessageSquare },
    { name: 'SEO', href: '/embro/dash/seo', color: 'bg-blue-600', icon: Globe, text: 'text-white' },
    { name: 'MÉTRICAS', href: '/embro/dash/metricas', color: 'bg-red-600', icon: TrendingUp, text: 'text-white' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // If on Login page, render full screen without Folder UI
    if (pathname === '/embro/dash/login') {
        return (
            <>
                <CRTWelcome />
                {children}
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-mono">
            <CRTWelcome />
            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-serif font-black text-2xl text-brand-dark">
                    PANEL_ADMINISTRADOR // v.1.0
                </h1>
                <button
                    onClick={() => signOut({ callbackUrl: '/embro/dash/login' })}
                    className="flex items-center gap-2 text-xs font-bold bg-white border-2 border-brand-dark px-3 py-1 hover:bg-gray-200"
                >
                    <LogOut className="w-4 h-4" /> CERRAR SESIÓN
                </button>
            </div>

            {/* FOLDER CONTAINER */}
            <div className="flex flex-col min-h-[80vh]">

                {/* TABS (TOP) */}
                <div className="flex overflow-x-auto items-end px-4 pt-4 gap-2 no-scrollbar" style={{ marginBottom: -4 }}>
                    {TABS.map((tab) => {
                        const isActive = pathname.startsWith(tab.href);
                        return (
                            <Link key={tab.name} href={tab.href}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`
                                        relative min-w-[140px] px-6 py-3 
                                        border-t-4 border-l-4 border-r-4 border-brand-dark 
                                        rounded-tr-xl rounded-tl-xl
                                        cursor-pointer flex items-center justify-center gap-2 font-bold transition-all
                                        ${tab.color} ${tab.text || 'text-brand-dark'}
                                        ${isActive ? 'z-30 border-b-0 pt-4 pb-4' : 'z-0 border-b-4 opacity-80 hover:opacity-100 mt-2'}
                                    `}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    <span>{tab.name}</span>
                                    {/* Hide bottom border trick for active tab to merge with content */}
                                    {isActive && (
                                        <div className={`absolute bottom-[-5px] left-[-4px] right-[-4px] h-[6px] ${tab.color} z-40`} />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                {/* MAIN CONTENT AREA (Folder Body) */}
                <div className="flex-grow bg-white border-4 border-brand-dark neo-shadow relative z-20 p-8 rounded-b-xl rounded-tr-xl">
                    {children}
                </div>

            </div>
        </div>
    );
}
