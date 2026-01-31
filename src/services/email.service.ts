import { resend } from '@/lib/resend';
import prisma from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';


export const sendOrderConfirmation = async (orderId: string) => {
    try {
        // 1. Fetch Order
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: true, // Only fetch items, we'll get matrix data manually
            },
        });

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status !== 'APPROVED') {
            throw new Error('Order not approved');
        }

        // 2. Prepare attachments (Matrix .zip files)
        const attachments = await Promise.all(order.items.map(async (item) => {
            // Manual fetch of matrix to avoid Schema Relation requirement
            const matrix = await prisma.matrix.findUnique({
                where: { id: item.matrixId }
            });

            if (!matrix || !matrix.fileUrl) return null;

            // matrix.fileUrl in DB is the storage path (e.g. "matrices/xyz.zip")
            const storagePath = matrix.fileUrl;

            // Download from Supabase Storage
            const { data, error } = await supabaseAdmin.storage
                .from('matrix-files')
                .download(storagePath);

            if (error || !data) {
                console.error(`Error downloading file for matrix ${matrix.id}:`, error);
                return null;
            }

            // Convert Blob to Buffer for Resend
            const arrayBuffer = await data.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return {
                filename: `${matrix.title.replace(/[^a-z0-9]/gi, '_')}.zip`, // Clean filename
                content: buffer,
            };
        }));

        const validAttachments = attachments.filter(a => a !== null) as any[];

        // 3. Send Email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Archivo Bordado <onboarding@resend.dev>', // Update to verified domain in prod
            to: [order.customerEmail],
            subject: '¡Tu compra en Archivo Bordado está lista!',
            html: `
        <div style="font-family: sans-serif; color: #333;">
            <h1 style="color: #000;">GRACIAS POR TU COMPRA</h1>
            <p>Tu pedido <strong>#${order.id.slice(-6)}</strong> ha sido confirmado.</p>
            <p>Adjunto a este correo encontrarás los archivos .ZIP con tus matrices.</p>
            <br/>
            <p>Si tienes algún problema, responde a este correo.</p>
        </div>
      `,
            attachments: validAttachments,
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};
