import { NextRequest, NextResponse } from 'next/server';
import { payment } from '@/lib/mercadopago';
import { updateOrderStatus } from '@/services/order.service';
import { sendOrderConfirmation } from '@/services/email.service';
// import { OrderStatus } from '@prisma/client'; // Not using Enum yet

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);
        const searchParams = request.nextUrl.searchParams;
        const topic = searchParams.get('topic') || searchParams.get('type');
        const id = searchParams.get('id') || searchParams.get('data.id');

        if (!topic || !id) {
            // Some webhooks put data in body
            if (body?.type === 'payment') {
                const paymentId = body.data.id;
                await handlePayment(paymentId);
                return NextResponse.json({ status: 'ok' });
            }
            return NextResponse.json({ status: 'ignored' });
        }

        if (topic === 'payment') {
            await handlePayment(id);
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

async function handlePayment(paymentId: string) {
    try {
        const paymentData = await payment.get({ id: paymentId });

        if (paymentData.status === 'approved') {
            const orderId = paymentData.external_reference;
            if (orderId) {
                // Update Order Status
                await updateOrderStatus(orderId, 'APPROVED', paymentId);

                // Send Email
                await sendOrderConfirmation(orderId);
                console.log(`Order ${orderId} approved and email sent.`);
            }
        }
    } catch (error) {
        console.error('Error handling payment:', error);
        throw error;
    }
}
