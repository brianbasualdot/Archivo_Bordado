'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AboutSection from '@/components/home/AboutSection';

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-brand-bg text-brand-dark">
            <Navbar />
            <div className="pt-20"> {/* Offset for Fixed Navbar if needed, or just spacing */}
                <AboutSection />
            </div>
            <Footer />
        </main>
    );
}
