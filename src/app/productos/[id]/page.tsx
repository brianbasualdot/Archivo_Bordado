import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ProductPage from '@/components/product/ProductPage';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductDetailRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await prisma.matrix.findUnique({
        where: { id }
    });

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-brand-bg relative">
                {/* @ts-ignore - Component needs update next */}
                <ProductPage product={product} />
            </div>
            <Footer />
        </main>
    );
}
