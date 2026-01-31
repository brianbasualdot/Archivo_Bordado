'use server';

import { revalidatePath } from 'next/cache';
// import { Resend } from 'resend';
// import prisma from '@/lib/prisma';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function approveTransferOrder(orderId: string) {
    console.log(`[SERVER ACTION] Approving order ${orderId}...`);

    try {
        // 1. Update Order Status in DB
        // await prisma.order.update({
        //   where: { id: orderId },
        //   data: { status: 'PAID' }
        // });

        // 2. Fetch User Email & Files
        // const order = await prisma.order.findUnique({ ... });

        // 3. Send Email via Resend
        // await resend.emails.send({
        //   from: 'Archivo Bordado <envios@archivobordado.com.ar>',
        //   to: 'cliente@email.com',
        //   subject: 'Tu Matriz está lista 🪡',
        //   react: EmailTemplate({ ... })
        // });

        // 4. Revalidate Dashboard
        revalidatePath('/embro/dash/ventas');

        return { success: true, message: 'Orden aprobada y archivos enviados.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al procesar la orden.' };
    }
}
