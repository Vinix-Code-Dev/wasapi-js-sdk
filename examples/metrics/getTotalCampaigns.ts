import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Ejemplo: Obtener total de campañas
 * 
 * Este ejemplo demuestra cómo obtener el total de campañas
 * en un rango de fechas específico.
 */

async function getTotalCampaigns() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('📊 Getting total campaigns...\n');

        // Date parameters (last 30 days)
        const endDate = new Date().toISOString().split('T')[0]; // Fecha actual
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 días atrás

        const dateParams = {
            startDate: startDate,
            endDate: endDate
        };

        console.log('📅 Date range:', dateParams);

        // Get total campaigns
        const response = await wasapi.metrics.getTotalCampaigns(dateParams);

        console.log('✅ Total campaigns obtained successfully:');

        if (response.success && response.total) {
            console.log('\n🎉 Campaign statistics:');
            console.log(`   Period: ${startDate} to ${endDate}`);
            console.log(`   Total campaigns: ${response.total.data || 0}`);
        } else {
            console.log('\n📝 No campaigns found or there was an error:', response.success);
        }

    } catch (error) {
        console.error('❌ Error getting total campaigns:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getTotalCampaigns();

