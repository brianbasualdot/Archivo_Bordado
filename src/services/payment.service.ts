import { preference, payment } from '@/lib/mercadopago'; // Adjust import path if needed
import { Preference, Payment } from 'mercadopago'; // Import types

export const createPreference = async (orderId: string, title: string, price: number) => {
    try {
        const response = await preference.create({
            body: {
                items: [
                    {
                        id: orderId,
                        title: title,
                        quantity: 1,
                        unit_price: price,
                        currency_id: 'ARS',
                    },
                ],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
                    failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
                    pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`,
                },
                auto_return: 'approved',
                notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/mercadopago`,
                external_reference: orderId,
            },
        });

        return response.init_point;
    } catch (error) {
        console.error('Error creating preference:', error);
        throw error;
    }
};

export const getPayment = async (paymentId: string) => {
    try {
        // Correct usage according to possible SDK version. Double check usage.
        // The 'payment' object from the SDK usually has a 'get' method.
        const response = await payment.get({ id: paymentId });
        return response;
    } catch (error) {
        console.error('Error getting payment:', error);
        throw error;
    }
}
