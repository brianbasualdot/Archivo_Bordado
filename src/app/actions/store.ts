'use server';

import prisma from '@/lib/prisma';

export async function getRandomProduct(excludeIds: string[] = []) {
    try {
        const count = await prisma.matrix.count({
            where: {
                id: { notIn: excludeIds }
            }
        });

        if (count === 0) return null;

        const skip = Math.floor(Math.random() * count);
        const product = await prisma.matrix.findFirst({
            where: {
                id: { notIn: excludeIds }
            },
            skip: skip
        });

        return product;
    } catch (error) {
        console.error("Error fetching random product:", error);
        return null;
    }
}
