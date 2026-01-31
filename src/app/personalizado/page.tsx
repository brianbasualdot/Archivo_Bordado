import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomOrderPage from '@/components/custom/CustomOrderPage';

export default function PersonalizadoRoute() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-brand-bg relative pattern-dots">
                {/* Optional: Add dot pattern background via CSS later if needed */}
                <CustomOrderPage />
            </div>
            <Footer />
        </main>
    );
}
