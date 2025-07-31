import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Ejemplo de obtención de todas las campañas
 */

// configuración del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: obtener todas las campañas
export async function getAllCampaignsExample() {
    try {
        console.log('📊 Obteniendo todas las campañas...');

        const campaigns = await client.campaigns.getAll();
        console.log('✅ Campañas obtenidas exitosamente:', campaigns.data);
        console.log(`📈 Total de campañas: ${campaigns.count}`);
        
        // Mostrar información básica de cada campaña
        campaigns.data.forEach((campaign, index) => {
            console.log(`\n--- Campaña ${index + 1} ---`);
            console.log(`ID: ${campaign.id}`);
            console.log(`Nombre: ${campaign.name}`);
            console.log(`Estado: ${campaign.status}`);
            console.log(`Fecha de creación: ${campaign.created_at}`);
        });

        return campaigns;
    } catch (error) {
        console.error('❌ Error al obtener campañas:', error);
        throw error;
    }
}

// ejemplo 2: obtener campañas con filtros (cuando esté implementado)
export async function getCampaignsWithFiltersExample() {
    try {
        console.log('📊 Obteniendo campañas con filtros...');
        console.log('⚠️  Nota: Los filtros aún no están implementados en el módulo');

        const campaigns = await client.campaigns.getAll();
        
        // Simular filtros en el cliente
        const activeCampaigns = campaigns.data.filter(campaign => 
            campaign.status === 'sent'
        );
        
        const inactiveCampaigns = campaigns.data.filter(campaign => 
            campaign.status === 'cancel'
        );

        console.log(`✅ Campañas activas: ${activeCampaigns.length}`);
        console.log(`✅ Campañas inactivas: ${inactiveCampaigns.length}`);

        return { active: activeCampaigns, inactive: inactiveCampaigns };
    } catch (error) {
        console.error('❌ Error al obtener campañas con filtros:', error);
        throw error;
    }
}

// función para ejecutar todos los ejemplos
export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de obtención de campañas...\n');

    try {
        // Ejecutar ejemplos uno por uno
        await getAllCampaignsExample();
        console.log('---\n');

        await getCampaignsWithFiltersExample();
        console.log('---\n');

        console.log('🎉 Todos los ejemplos de obtención de campañas ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecución de ejemplos:', error);
    }
}
