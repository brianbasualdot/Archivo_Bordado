'use server';

import { Preference } from 'mercadopago'; // Import resource
import { mpClient } from '@/lib/mercadopago'; // Import client singleton
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // For creating the pending order

interface PreferenceItem {
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
    picture_url?: string;
}

interface CreatePreferenceParams {
    items: PreferenceItem[];
    payerEmail: string;
    payerName?: string;
    payerPhone?: string;
}

export async function createPreference({ items, payerEmail, payerName, payerPhone }: CreatePreferenceParams) {

    // 1. Create a Pending Order in DB to track this attempt
    // We calculate total ourselves to be safe
    const total = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

    // Find matching matrix IDs (assuming item.id is the matrix ID)
    // In a real app we might validate these IDs exist again here.

    const order = await prisma.order.create({
        data: {
            customerEmail: payerEmail,
            customerName: payerName,
            total: total,
            status: 'PENDING',
            items: {
                create: items.map(item => ({
                    matrixId: item.id,
                    price: item.unit_price
                }))
            }
        }
    });

    const preference = new Preference(mpClient);

    try {
        const result = await preference.create({
            body: {
                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    unit_price: item.unit_price,
                    quantity: item.quantity,
                    currency_id: 'ARS',
                    picture_url: item.picture_url,
                    description: 'Matriz Digital - Archivo Bordado',
                    category_id: 'digital_goods'
                })),
                payer: {
                    name: payerName?.split(' ')[0] || 'Cliente',
                    surname: payerName?.split(' ').slice(1).join(' ') || 'General',
                    email: payerEmail,
                    // phone: { // MP phone format can be strict, optional for now to avoid errors
                    //     area_code: '',
                    //     number: payerPhone
                    // }
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?orderId=${order.id}`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout`
                },
                // auto_return: 'approved',
                external_reference: order.id, // CRITICAL: Links MP payment to our DB Order
                statement_descriptor: 'ARCHIVO BORDADO',
            }
        });

        if (result.id) {
            // Update order with preference ID
            await prisma.order.update({
                where: { id: order.id },
                data: { mpPreferenceId: result.id }
            });

            return { init_point: result.init_point, preferenceId: result.id };
        } else {
            throw new Error('No preference ID returned from Mercado Pago');
        }

    } catch (error) {
        console.error('Error creating preference:', error);
        return { error: `Error MP: ${(error as any).message || JSON.stringify(error)}` };
    }
}
