'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface SecureImageCanvasProps {
    src: string;
    alt: string;
}

export default function SecureImageCanvas({ src, alt }: SecureImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Draw image on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous"; // Important for canvas security if needed

        img.onload = () => {
            // Set canvas size to match image aspect ratio but fit container
            // For now, we fix height or width usually handled by CSS, 
            // but internal resolution should match image for quality
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
        };
    }, [src]);

    // Anti-Copy Protections
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Block common inspect shortcuts
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div
                className="relative w-full overflow-hidden border-4 border-brand-dark bg-gray-100 neo-shadow cursor-zoom-in group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsZoomOpen(true)}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-auto block select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    aria-label={alt}
                    role="img"
                />

                {/* Hover Hint */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none bg-brand-dark/20 backdrop-blur-[1px]"
                        >
                            <div className="bg-brand-yellow px-4 py-2 border-2 border-brand-dark neo-shadow flex items-center gap-2">
                                <ZoomIn className="w-5 h-5" />
                                <span className="font-mono font-bold">ZOOM INSPECTOR</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Fullscreen Zoom Modal */}
            <AnimatePresence>
                {isZoomOpen && (
                    <ZoomModal src={src} onClose={() => setIsZoomOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

// Inner Component for Zoom Logic
function ZoomModal({ src, onClose }: { src: string; onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            draw(ctx, img, scale, position);
        };

        function draw(context: CanvasRenderingContext2D, image: HTMLImageElement, s: number, p: { x: number, y: number }) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.save();
            context.translate(context.canvas.width / 2 + p.x, context.canvas.height / 2 + p.y);
            context.scale(s, s);
            context.drawImage(image, -image.width / 2, -image.height / 2);
            context.restore();
        }

        const animate = () => {
            draw(ctx, img, scale, position);
            // requestAnimationFrame(animate); // Not strictly needed unless animating
        }
        animate();

    }, [src, scale, position]);

    // Mouse Wheel Zoom
    const handleWheel = (e: React.WheelEvent) => {
        const delta = e.deltaY * -0.001;
        const newScale = Math.min(Math.max(0.5, scale + delta), 5); // Limit zoom 0.5x to 5x
        setScale(newScale);
    };

    // Pan Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 flex flex-col items-center justify-center p-4 overflow-hidden"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[101] bg-brand-orange text-brand-dark border-2 border-brand-bg p-2 neo-shadow hover:scale-105 transition-transform"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="absolute top-8 left-8 z-[101] text-brand-bg font-mono text-sm pointer-events-none">
                <p>MOUSE WHEEL: ZOOM</p>
                <p>DRAG: PAN</p>
            </div>

            <div
                className="w-full h-full flex items-center justify-center cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* High Res Canvas */}
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full object-contain"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
        </motion.div>
    )
}
