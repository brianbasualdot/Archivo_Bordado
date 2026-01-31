import prisma from '@/lib/prisma';
import { OrderStatus, PaymentMethod } from '@prisma/client';

export const createOrder = async (customerEmail: string, matrixId: string, paymentMethod: PaymentMethod) => {
    const matrix = await prisma.matrix.findUnique({ where: { id: matrixId } });
    if (!matrix) throw new Error('Matrix not found');

    // Calculate total (apply discount if TRANSFER)
    let total = Number(matrix.price);
    if (paymentMethod === PaymentMethod.TRANSFER) {
        total = total * 0.9; // 10% discount
    }

    return await prisma.order.create({
        data: {
            customerEmail,
            paymentMethod,
            totalAmount: total,
            status: OrderStatus.PENDING,
            items: {
                create: {
                    matrixId: matrix.id,
                    price: matrix.price,
                },
            },
        },
    });
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus, mercadopagoId?: string) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: {
            status,
            mercadopagoId,
        },
    });
};

export const getOrderByPaymentId = async (paymentId: string) => {
    // This assumes we stored the paymentId, but typically webhooks give us the payment ID
    // and we need to find the order.
    // If we store the preference external_reference as orderId, we can use that.
    return await prisma.order.findUnique({
        where: { mercadopagoId: paymentId }
    })
}
