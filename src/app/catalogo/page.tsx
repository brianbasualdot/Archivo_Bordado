import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CatalogoGrid from '@/components/catalogo/CatalogoGrid';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Ensure we always get fresh data

export default async function CatalogoPage() {
    const products = await prisma.matrix.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-brand-bg relative">
                {/* Optional: Add some decorative background elements or 'thread' concept here */}
                <CatalogoGrid initialProducts={products.map(p => ({ ...p, description: p.description || undefined }))} />
            </div>
            <Footer />
        </main>
    );
}
