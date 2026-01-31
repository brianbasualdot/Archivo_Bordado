import type { Metadata } from 'next';
import { Merriweather, Space_Mono } from 'next/font/google';
import './globals.css';
import RetroWhatsApp from '@/components/ui/RetroWhatsApp';
import { CartProvider } from '@/context/CartContext';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    variable: '--font-merriweather',
    display: 'swap',
});

const spaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-space-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Archivo Bordado',
    description: 'Digital embroidery matrices assets.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${merriweather.variable} ${spaceMono.variable} antialiased`}>
                <CartProvider>
                    {children}
                    <RetroWhatsApp />
                </CartProvider>
            </body>
        </html>
    );
}
