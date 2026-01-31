
export interface Product {
    id: string;
    title: string;
    price: number;
    description?: string;
    stitches: number;
    widthMm: number;
    heightMm: number;
    colors: number;
    formats: string[];
    tags: string[];
    imageUrl: string;
    fileUrl: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// A simpler interface for what the UI mostly needs, if strict full model isn't always available
export interface ProductUI {
    id: string;
    title: string;
    price: number;
    imageUrl?: string | null;
    stitches?: number;
    width?: number; // sometimes mapped from widthMm
    height?: number; // sometimes mapped from heightMm
    formats?: string[];
    tags?: string[];
}
