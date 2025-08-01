import { WasapiClient } from '../../src/wasapi';
import { CreateLabel } from '../../src/wasapi/models';

import dotenv from 'dotenv';

dotenv.config();

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');


export async function createLabel() {
    try {
    
        // datos de la nueva etiqueta
        const newLabel: CreateLabel = {
            title: 'Cliente VIP',
            description: 'Etiqueta para identificar clientes de alto valor',
            color: '#FF6B6B' // color en formato hexadecimal
        };

        console.log('🔄 Creando nueva etiqueta...');
        console.log(`📝 Datos de la etiqueta:`);
        console.log(`   Título: ${newLabel.title}`);
        console.log(`   Descripción: ${newLabel.description}`);
        console.log(`   Color: ${newLabel.color}`);
        
        // Crear la etiqueta
        const response = await client.labels.create(newLabel);
        
        if (response.success) {
            console.log('\n✅ Etiqueta creada exitosamente:');
            console.log(`\n🏷️  Detalles de la etiqueta creada:`);
            console.log(`   ID: ${response.data.id}`);
            console.log(`   Título: ${response.data.title}`);
            console.log(`   Descripción: ${response.data.description || 'Sin descripción'}`);
            console.log(`   Color: ${response.data.color}`);
            console.log(`   Última actualización: ${response.data.updated_at}`);
        } else {
            console.log('❌ Error al crear la etiqueta');
        }
        
    } catch (error) {
        console.error('❌ Error en createLabel:', error);
    }
}