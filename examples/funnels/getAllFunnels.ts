import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * example: Get all funnels
 * 
 * This example demonstrates how to get the complete list of funnels
 * configured in the Wasapi account.
 */

async function getAllFunnels() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('🔄 Getting all funnels...\n');

        // Get all funnels
        const response = await wasapi.funnels.getAll();

        console.log('✅ Funnels obtained successfully:');

        if (response.success && response.data) {
            console.log(`\n🎉 Found ${response.data.length} funnels:`);
            
            response.data.forEach((funnel, index) => {
                console.log(`\n${index + 1}. Funnel: ${funnel.name}`);
                console.log(`   ID: ${funnel.id}`);
                console.log(`   UUID: ${funnel.uuid}`);
                console.log(`   Creado: ${funnel.created_at}`);
                console.log(`   Actualizado: ${funnel.updated_at}`);
                
                if (funnel.stages && funnel.stages.length > 0) {
                    console.log(`   Etapas (${funnel.stages.length}):`);
                    funnel.stages.forEach((stage, stageIndex) => {
                        console.log(`     ${stageIndex + 1}. ${stage.name} (${stage.uuid})`);
                    });
                }
            });
        } else {
            console.log('\n📝 No funnels found or there was an error:', response.success);
        }

    } catch (error) {
        console.error('❌ Error getting the funnels:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getAllFunnels();

