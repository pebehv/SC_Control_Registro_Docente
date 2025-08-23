// src/types/global.d.ts

// Asegúrate de que este archivo NO tenga ninguna sentencia 'import' o 'export'
// en el nivel superior. Si las tiene, dejará de ser global.

declare global {
    interface Window {
        api: {
            openFileDialog: () => Promise<{ success: boolean; filePath: string | null; message?: string }>;
            insertImage: (fileData: { filePath: string; imageName: string; mimeType: string }) => Promise<{ success: boolean; message: string; id?: number; error?: string }>;
            getImages: () => Promise<{ success: boolean; data: ImageMeta[] }>;
            getImageData: (id: number) => Promise<{ success: boolean; data?: string; mimeType?: string; message?: string }>;
        };
    }
}

// Si tu interfaz ImageMeta es global, puedes ponerla aquí también
interface ImageMeta {
    id: number;
    nombre_imagen: string;
    tipo_mime: string;
}