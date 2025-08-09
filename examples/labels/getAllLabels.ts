import { WasapiClient } from '../../src/wasapi';

import dotenv from 'dotenv';

dotenv.config();
// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

export async function getAllLabels() {
    try {

        console.log('🔄 Obteniendo todas las etiquetas...');
        
        // Obtener todas las etiquetas
        const response = await client.labels.getAll();
        
        if (response.success) {
            console.log('✅ Etiquetas obtenidas exitosamente:');
            console.log(`📊 Total de etiquetas: ${response.labels.length}`);
            
            response.labels.forEach((label, index) => {
                console.log(`\n🏷️  Etiqueta ${index + 1}:`);
                console.log(`   ID: ${label.id}`);
                console.log(`   Título: ${label.title}`);
                console.log(`   Descripción: ${label.description || 'Sin descripción'}`);
                console.log(`   Color: ${label.color}`);
                console.log(`   Última actualización: ${label.updated_at}`);
            });
        } else {
            console.log('❌ Error al obtener las etiquetas');
        }
        
    } catch (error) {
        console.error('❌ Error en getAllLabels:', error);
    }
}

