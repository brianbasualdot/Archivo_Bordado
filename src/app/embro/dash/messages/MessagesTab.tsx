'use client';

import { useState } from 'react';

import { Lock, Trash2, Send, MessageSquare } from 'lucide-react';

// MOCK DATA TYPES
type MessageStatus = 'PENDING' | 'QUOTED' | 'COMPLETED' | 'CLOSED' | 'NEW';
type Category = 'PEDIDOS_NUEVOS' | 'PENDIENTES' | 'ENVIADOS' | 'CONSULTAS';

interface Message {
    id: string;
    clientName: string;
    email: string;
    category: Category;
    status: MessageStatus;
    subject: string;
    history: { sender: 'CLIENT' | 'ADMIN', text: string, time: string }[];
    lastUpdate: string;
}

const MOCK_MESSAGES: Message[] = [];

export default function MessagesTab() {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
    const [replyText, setReplyText] = useState('');

    const selectedMessage = messages.find(m => m.id === selectedId);

    // ACTIONS
    const handleFinalize = (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'CLOSED' } : m));
    };

    const handleDelete = (id: string) => {
        if (confirm("¿ELIMINAR DEFINITIVAMENTE? Esta acción no se puede deshacer.")) {
            setMessages(prev => prev.filter(m => m.id !== id));
            if (selectedId === id) setSelectedId(null);
        }
    };

    const handleSend = () => {
        if (!replyText.trim() || !selectedId) return;
        setMessages(prev => prev.map(m => {
            if (m.id === selectedId) {
                return {
                    ...m,
                    history: [...m.history, { sender: 'ADMIN', text: replyText, time: 'Now' }]
                };
            }
            return m;
        }));
        setReplyText('');
    };

    const getCategoryColor = (cat: Category) => {
        switch (cat) {
            case 'PEDIDOS_NUEVOS': return 'bg-red-500';
            case 'PENDIENTES': return 'bg-brand-yellow';
            case 'ENVIADOS': return 'bg-brand-green';
            case 'CONSULTAS': return 'bg-[#0047FF] text-white'; // Electric Blue
            default: return 'bg-gray-200';
        }
    };

    const filteredMessages = filter === 'ALL' ? messages : messages.filter(m => m.category === filter);

    return (
        <div className="flex flex-col md:flex-row gap-4 min-h-[600px]">

            {/* SIDEBAR LIST */}
            <div className="w-full md:w-1/3 bg-white border-4 border-brand-dark neo-shadow flex flex-col max-h-[600px]">

                {/* FILTERS HEADER */}
                <div className="p-4 bg-brand-bg border-b-4 border-brand-dark space-y-4">
                    <h2 className="font-serif font-black text-2xl flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-brand-pink" />
                        COMUNICACIÓN
                    </h2>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {['ALL', 'PEDIDOS_NUEVOS', 'PENDIENTES', 'ENVIADOS', 'CONSULTAS'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as Category | 'ALL')}
                                className={`
                            px-3 py-1 font-mono text-xs font-bold border-2 border-brand-dark whitespace-nowrap
                            ${filter === cat ? 'bg-brand-pink text-white neo-shadow-sm' : 'bg-white hover:bg-gray-100'}
                        `}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* MESSAGES LIST */}
                <div className="flex-grow overflow-y-auto p-2 space-y-2">
                    {filteredMessages.map(msg => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedId(msg.id)}
                            className={`
                        cursor-pointer border-2 border-brand-dark p-3 transition-all hover:translate-x-1
                        ${selectedId === msg.id ? 'bg-white neo-shadow border-brand-pink' : 'bg-gray-50 hover:bg-white'}
                        ${msg.status === 'NEW' ? 'animate-pulse-slow border-red-500' : ''}
                    `}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-black ${getCategoryColor(msg.category)}`}>
                                    {msg.category.replace('_', ' ')}
                                </span>
                                <span className="font-mono text-[10px] text-gray-500">{msg.lastUpdate}</span>
                            </div>
                            <h3 className="font-bold font-sans text-sm truncate">{msg.clientName}</h3>
                            <p className="font-mono text-xs text-brand-dark truncate">{msg.subject}</p>
                        </div>
                    ))}
                    {filteredMessages.length === 0 && (
                        <div className="p-8 text-center font-mono text-gray-400">
                            NO_DATA_FOUND
                        </div>
                    )}
                </div>
            </div>

            {/* DETAIL VIEW */}
            <div className="w-full md:w-2/3 bg-brand-bg border-4 border-brand-dark neo-shadow relative flex flex-col">
                {selectedMessage ? (
                    <>
                        {/* HEADER */}
                        <div className="bg-brand-pink border-b-4 border-brand-dark p-4 flex justify-between items-center text-white">
                            <div>
                                <h2 className="font-black font-serif text-xl">{selectedMessage.subject}</h2>
                                <p className="font-mono text-sm">{selectedMessage.email}</p>
                            </div>
                            <div className="flex gap-2">
                                {selectedMessage.status !== 'CLOSED' && (
                                    <button
                                        onClick={() => handleFinalize(selectedMessage.id)}
                                        className="bg-brand-green text-brand-dark border-2 border-brand-dark p-2 hover:bg-green-400 neo-shadow-sm"
                                        title="Finalizar (Cerrar disputa)"
                                    >
                                        <Lock className="w-5 h-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="bg-red-500 text-white border-2 border-brand-dark p-2 hover:bg-red-600 neo-shadow-sm"
                                    title="Eliminar Definitivamente"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* CHAT HISTORY */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-dots-pattern">
                            {selectedMessage.history.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                max-w-[80%] p-4 border-2 border-brand-dark neo-shadow
                                ${msg.sender === 'ADMIN' ? 'bg-white text-brand-dark' : 'bg-brand-yellow text-brand-dark'}
                            `}>
                                        <div className="text-sm font-sans font-medium mb-1">{msg.text}</div>
                                        <div className="text-[10px] font-mono opacity-60 text-right">{msg.time}</div>
                                    </div>
                                </div>
                            ))}

                            {selectedMessage.status === 'CLOSED' && (
                                <div className="flex justify-center my-4">
                                    <span className="bg-gray-200 text-gray-600 font-mono text-xs px-3 py-1 border border-gray-400 rounded-full flex items-center gap-2">
                                        <Lock className="w-3 h-3" /> CONVERSACIÓN CERRADA
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* INPUT AREA */}
                        <div className="p-4 bg-white border-t-4 border-brand-dark">
                            <div className="flex gap-2">
                                <input
                                    disabled={selectedMessage.status === 'CLOSED'}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={selectedMessage.status === 'CLOSED' ? "Hilo finalizado." : "Escribe una respuesta..."}
                                    className="flex-grow border-2 border-brand-dark p-3 font-mono outline-none focus:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                <button
                                    disabled={selectedMessage.status === 'CLOSED'}
                                    onClick={handleSend}
                                    className="bg-brand-dark text-white px-6 border-2 border-transparent hover:bg-brand-pink hover:text-brand-dark hover:border-brand-dark font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-brand-dark/30">
                        <MessageSquare className="w-24 h-24 mb-4" />
                        <p className="font-mono font-bold text-xl">SELECCIONA UN MENSAJE</p>
                    </div>
                )}
            </div>

        </div>
    );
}
