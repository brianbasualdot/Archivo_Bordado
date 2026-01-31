'use server';

import prisma from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
    const rawData = {
        title: formData.get('nombre') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('precio')),
        stitches: Number(formData.get('puntadas')),
        widthMm: Number(formData.get('ancho_mm')),
        heightMm: Number(formData.get('alto_mm')),
        colors: Number(formData.get('colores')),
        formats: formData.getAll('formatos') as string[],
        tags: formData.getAll('tags') as string[],
    };

    const imageFile = formData.get('imageFile') as File;
    const zipFile = formData.get('zipFile') as File;

    // Validations (Basic)
    if (!rawData.title || !rawData.price) {
        return { error: 'Faltan campos obligatorios' };
    }

    let imageUrl = 'https://placehold.co/600x600/png?text=No+Image';
    let fileUrl = '';

    // Upload Image
    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from('public-assets')
            .upload(filePath, imageFile, { contentType: imageFile.type, upsert: true });

        if (uploadError) {
            console.error("Image Upload Error:", uploadError);
            throw new Error("Error subiendo la imagen de portada");
        }

        const { data: { publicUrl } } = supabaseAdmin.storage.from('public-assets').getPublicUrl(filePath);
        imageUrl = publicUrl;
    }

    // Upload Matrix Zip
    if (zipFile && zipFile.size > 0) {
        const fileExt = zipFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `matrices/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from('matrix-files')
            .upload(filePath, zipFile, { contentType: zipFile.type, upsert: true });

        if (uploadError) {
            console.error("Zip Upload Error:", uploadError);
            throw new Error("Error subiendo el archivo matriz");
        }

        // For private buckets we store the path, not a public URL
        fileUrl = filePath;
    } else {
        // If no file is provided, we can't sell a digital product properly
        return { error: 'Falta el archivo .ZIP de la matriz' };
    }

    try {
        await prisma.matrix.create({
            data: {
                title: rawData.title,
                slug: rawData.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
                description: rawData.description,
                price: rawData.price,
                stitches: rawData.stitches || 0,
                widthMm: rawData.widthMm || 0,
                heightMm: rawData.heightMm || 0,
                colors: rawData.colors || 1,
                formats: rawData.formats,
                tags: rawData.tags,
                imageUrl: imageUrl,
                fileUrl: fileUrl,
            },
        });

        revalidatePath('/embro/dash/productos');
        revalidatePath('/catalogo');
        return { success: true };

    } catch (error) {
        console.error("Error creating product:", error);
        return { error: 'Error al guardar en base de datos: ' + (error as Error).message };
    }
}

export async function getProducts() {
    try {
        const products = await prisma.matrix.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function deleteProduct(id: string) {
    try {
        // 1. Get product to find file paths
        const product = await prisma.matrix.findUnique({ where: { id } });
        if (!product) return { error: 'Producto no encontrado' };

        // 2. Delete files from Supabase (Best effort)
        // Extract paths from URLs if possible, or assume stored paths if logic changed
        // Currently createProduct stores full URL for image and path for file.

        // Image cleanup (Public URL usually contains the path)
        if (product.imageUrl && product.imageUrl.includes('public-assets')) {
            const imagePath = product.imageUrl.split('public-assets/').pop();
            if (imagePath) await supabaseAdmin.storage.from('public-assets').remove([imagePath]);
        }

        // Zip cleanup (Stored as path)
        if (product.fileUrl) {
            await supabaseAdmin.storage.from('matrix-files').remove([product.fileUrl]);
        }

        // 3. Delete from DB
        await prisma.matrix.delete({ where: { id } });

        revalidatePath('/embro/dash/productos');
        revalidatePath('/catalogo');
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { error: 'Error al eliminar producto' };
    }
}

export async function updateProduct(id: string, data: { title?: string, price?: number, categories?: string[] }) {
    try {
        await prisma.matrix.update({
            where: { id },
            data: {
                title: data.title,
                price: data.price,
                tags: data.categories
            }
        });
        revalidatePath('/embro/dash/productos');
        revalidatePath('/catalogo');
        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { error: 'Error al actualizar producto' };
    }
}
