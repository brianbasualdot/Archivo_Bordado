import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';

export const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

export const payment = new Payment(mpClient);
export const preference = new Preference(mpClient);
