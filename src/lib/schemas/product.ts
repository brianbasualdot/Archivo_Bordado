import { z } from 'zod';

export const productSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    precio: z.coerce.number().min(100, "El precio mínimo es $100"),
    categoriaId: z.string().min(1, "Debes seleccionar una categoría"),
    puntadas: z.coerce.number().min(1, "Debe tener al menos 1 puntada"),
    ancho_mm: z.coerce.number().min(1, "Ancho requerido"),
    alto_mm: z.coerce.number().min(1, "Alto requerido"),
    colores: z.coerce.number().min(1, "Al menos 1 color"),
    formatos: z.array(z.string()).min(1, "Selecciona al menos 1 formato"),
});

export type ProductFormData = z.infer<typeof productSchema>;
