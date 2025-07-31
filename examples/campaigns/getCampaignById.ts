import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Ejemplo de obtención de una campaña específica por ID
 */

// configuración del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: obtener campaña por ID específico
export async function getCampaignByIdExample() {
    try {
        console.log('📊 Obteniendo campaña por ID...');
        
    
        console.log(`🔍 Buscando campaña con ID: ${constants.CAMPAIGN_ID}`);

        const campaign = await client.campaigns.getById(constants.CAMPAIGN_ID);
        
        // Mostrar información detallada de la campaña
        console.log('\n--- Detalles de la Campaña ---');
        console.log(`ID: ${campaign.data.campaign.id}`);
        console.log(`Nombre: ${campaign.data.campaign.name}`);
        console.log(`Estado: ${campaign.data.campaign.status}`);
        console.log(`Fecha de creación: ${campaign.data.campaign.created_at}`);
        console.log(`Fecha de actualización: ${campaign.data.campaign.updated_at}`);
        
        // Mostrar más campos si están disponibles
        if (campaign.data.campaign.description) {
            console.log(`Descripción: ${campaign.data.campaign.description}`);
        }
        console.log(`Job ID: ${campaign.data.campaign.job_id}`);
        console.log(`Phone ID: ${campaign.data.campaign.phone_id}`);
        console.log(`Jobs Count: ${campaign.data.campaign.jobs_count}`);
        console.log(`UUID: ${campaign.data.campaign.uuid}`);

        return campaign;
    } catch (error) {
        console.error('❌ Error al obtener campaña por ID:', error);
        throw error;
    }
}

// función para ejecutar todos los ejemplos
export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de obtención de campaña por ID...\n');

    try {
        // Ejecutar ejemplos uno por uno
        await getCampaignByIdExample();
        console.log('---\n');

        console.log('🎉 Todos los ejemplos de obtención por ID ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecución de ejemplos:', error);
    }
}
