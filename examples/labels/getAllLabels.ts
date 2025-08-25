import { WasapiClient } from '../../src/wasapi';

import dotenv from 'dotenv';

dotenv.config();
// client configuration
const client = new WasapiClient(process.env.API_KEY || '');

async function getAllLabels() {
    try {

        console.log('🔄 getting all labels...');
        
        // get all labels
        const response = await client.labels.getAll();
        
        if (response.success) {
            console.log('✅ labels obtained successfully:');
            console.log(`📊 Total labels: ${response.labels.length}`);
            
            response.labels.forEach((label, index) => {
                console.log(`\n🏷️  Etiqueta ${index + 1}:`);
                console.log(`   ID: ${label.id}`);
                console.log(`   Title: ${label.title}`);
                console.log(`   Description: ${label.description || 'No description'}`);
                console.log(`   Color: ${label.color}`);
                console.log(`   Last update: ${label.updated_at}`);
            });
        } else {
            console.log('❌ Error getting labels');
        }
        
    } catch (error) {
        console.error('❌ Error getting labels:', error);
    }
}

getAllLabels();
