import { WasapiClient } from '../../src/wasapi';
import { CreateLabel } from '../../src/wasapi/models';

import dotenv from 'dotenv';

dotenv.config();

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY || '');


 async function createLabel() {
    try {
    
        // data of the new label
        const newLabel: CreateLabel = {
            title: 'Wasapi SDK',
            description: 'Label for Wasapi SDK',
            color: '#00FF00' // hexadecimal color VERDE
        };

        console.log('🔄 creating new label...');
        console.log(`📝 label data:`);
        console.log(`   Title: ${newLabel.title}`);
        console.log(`   Description: ${newLabel.description}`);
        console.log(`   Color: ${newLabel.color}`);
        
        // create the label
        const response = await client.labels.create(newLabel);
        
        if (response.success) {
            console.log('\n✅ label created successfully:');
            console.log(`\n🏷️  label details:`);
            console.log(`   ID: ${response.data.id}`);
            console.log(`   Title: ${response.data.title}`);
            console.log(`   Description: ${response.data.description || 'No description'}`);
            console.log(`   Color: ${response.data.color}`);
            console.log(`   Last update: ${response.data.updated_at}`);
        } else {
            console.log('❌ Error creating label');
        }
        
    } catch (error) {
        console.error('❌ Error creating label:', error);
    }
}

createLabel();