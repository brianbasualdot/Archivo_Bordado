'use client';

import { useState } from 'react';
import { Pencil, Trash2, X, Check, Search } from 'lucide-react';
import { deleteProduct, updateProduct } from '@/app/actions/products';

import { Product } from '@/types';

interface ProductListProps {
    initialProducts: Product[]; // Use the imported full Product type
}

import ConfirmModal from '@/components/ui/ConfirmModal';

export default function ProductList({ initialProducts }: ProductListProps) {
    const [products, setProducts] = useState(initialProducts);
    const [filter, setFilter] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null); // New state for modal

    // Edit Form State
    const [editForm, setEditForm] = useState<{ title: string; price: string; tags: string }>({
        title: '',
        price: '',
        tags: ''
    });

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );

    const requestDelete = (id: string) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = async () => {
        if (!deleteConfirmId) return;

        setIsDeleting(deleteConfirmId);
        const result = await deleteProduct(deleteConfirmId);

        if (result.success) {
            setProducts(prev => prev.filter(p => p.id !== deleteConfirmId));
        } else {
            alert(result.error);
        }
        setIsDeleting(null);
        setDeleteConfirmId(null);
    };

    const startEdit = (product: Product) => {
        setEditingId(product.id);
        setEditForm({
            title: product.title,
            price: product.price.toString(),
            tags: product.tags.join(', ')
        });
    };

    const saveEdit = async () => {
        if (!editingId) return;

        const result = await updateProduct(editingId, {
            title: editForm.title,
            price: Number(editForm.price),
            categories: editForm.tags.split(',').map(t => t.trim()).filter(Boolean)
        });

        if (result.success) {
            setProducts(prev => prev.map(p => p.id === editingId ? {
                ...p,
                title: editForm.title,
                price: Number(editForm.price),
                tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean)
            } : p));
            setEditingId(null);
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="bg-white border-4 border-brand-dark neo-shadow p-6 relative">
            <ConfirmModal
                isOpen={!!deleteConfirmId}
                title="¿ELIMINAR PRODUCTO?"
                message="Esta acción no se puede deshacer. Se borrará la matriz de la base de datos y sus archivos asociados."
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirmId(null)}
                isLoading={!!isDeleting}
            />

            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif font-black text-2xl text-brand-dark">
                    PRODUCTOS ({products.length})
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border-2 border-brand-dark font-mono text-sm focus:bg-brand-yellow/20 outline-none w-64"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="border-2 border-brand-dark">
                {/* HEADERS */}
                <div className="grid grid-cols-12 gap-4 bg-brand-dark text-white p-3 font-mono text-sm font-bold">
                    <div className="col-span-2">IMAGEN</div>
                    <div className="col-span-4">NOMBRE</div>
                    <div className="col-span-2">PRECIO</div>
                    <div className="col-span-2 text-center">CATEGORÍAS</div>
                    <div className="col-span-2 text-center">ACCIONES</div>
                </div>

                {/* LIST */}
                <div className="max-h-[500px] overflow-y-auto">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="grid grid-cols-12 gap-4 p-3 border-b-2 border-brand-dark/10 items-center hover:bg-gray-50 transition-colors">
                            {/* IMAGE */}
                            <div className="col-span-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover border-2 border-brand-dark" />
                            </div>

                            {/* TITLE & FORM */}
                            <div className="col-span-4">
                                {editingId === product.id ? (
                                    <input
                                        value={editForm.title}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full border-b-2 border-brand-orange outline-none p-1 font-bold"
                                        autoFocus
                                    />
                                ) : (
                                    <span className="font-bold font-mono text-sm block truncate" title={product.title}>
                                        {product.title}
                                    </span>
                                )}
                            </div>

                            {/* PRICE */}
                            <div className="col-span-2">
                                {editingId === product.id ? (
                                    <div className="flex items-center">
                                        <span className="font-bold">$</span>
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                                            className="w-20 border-b-2 border-brand-orange outline-none p-1"
                                        />
                                    </div>
                                ) : (
                                    <span className="font-mono text-brand-green font-bold">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            {/* TAGS */}
                            <div className="col-span-2 text-center">
                                {editingId === product.id ? (
                                    <input
                                        value={editForm.tags}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full border-b-2 border-brand-orange outline-none p-1 text-xs"
                                        placeholder="Separado por comas"
                                    />
                                ) : (
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {product.tags.slice(0, 2).map((tag, i) => (
                                            <span key={i} className="px-1 bg-brand-yellow/50 border border-brand-dark text-[10px] font-bold">
                                                {tag}
                                            </span>
                                        ))}
                                        {product.tags.length > 2 && (
                                            <span className="text-[10px] bg-gray-200 border border-gray-400 px-1">+{product.tags.length - 2}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div className="col-span-2 flex justify-center gap-2">
                                {editingId === product.id ? (
                                    <>
                                        <button onClick={saveEdit} className="text-green-600 hover:bg-green-100 p-1 rounded">
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="text-gray-500 hover:bg-gray-100 p-1 rounded">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(product)} className="text-brand-blue hover:bg-blue-100 p-2 border-2 border-transparent hover:border-brand-blue transition-all">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => requestDelete(product.id)}
                                            disabled={!!isDeleting}
                                            className="text-red-500 hover:bg-red-100 p-2 border-2 border-transparent hover:border-red-500 transition-all disabled:opacity-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="p-8 text-center text-gray-400 italic font-mono">
                            No se encontraron productos.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
