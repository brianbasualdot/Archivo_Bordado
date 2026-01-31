'use client';

import { Instagram, Mail, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-brand-dark text-brand-bg border-t-8 border-brand-orange pt-12 pb-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <h2 className="font-serif text-3xl font-black tracking-tighter text-brand-yellow">
                        ARCHIVO_BORDADO
                    </h2>
                    <p className="font-mono text-sm max-w-md text-gray-400">
                        Digitalización de alta calidad para bordados profesionales.
                        Rescatando la estética del pasado para los creadores del futuro.
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-4">
                    <h3 className="font-mono font-bold text-brand-orange mb-4 border-b-2 border-brand-orange inline-block">
                        EXPLORAR
                    </h3>
                    <ul className="space-y-2 font-mono text-sm">
                        <li><a href="#" className="hover:text-brand-yellow transition-colors">Catálogo Completo</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors">Solicitar Personalizado</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors">Preguntas Frecuentes</a></li>
                        <li><a href="#" className="hover:text-brand-yellow transition-colors">Política de Uso</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div className="space-y-4">
                    <h3 className="font-mono font-bold text-brand-orange mb-4 border-b-2 border-brand-orange inline-block">
                        CONECTAR
                    </h3>
                    <div className="flex space-x-4">
                        <a href="#" className="bg-brand-bg text-brand-dark p-2 border-2 border-transparent hover:bg-brand-pink hover:border-brand-bg transition-colors neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="bg-brand-bg text-brand-dark p-2 border-2 border-transparent hover:bg-brand-pink hover:border-brand-bg transition-colors neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="bg-brand-bg text-brand-dark p-2 border-2 border-transparent hover:bg-brand-pink hover:border-brand-bg transition-colors neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-6 text-center">
                <p className="font-mono text-xs text-gray-500">
                    © {new Date().getFullYear()} ARCHIVO BORDADO. TODOS LOS DERECHOS RESERVADOS.
                </p>
            </div>
        </footer>
    );
}
