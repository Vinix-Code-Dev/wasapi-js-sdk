import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * example: Update a custom field
 * 
 * This example demonstrates how to update the name of an existing custom field
 * using its ID.
 */

async function updateCustomField() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('✏️ Updating custom field...\n');

        // ID of the custom field to update (you must replace with a real ID)
        const fieldId = '4486'; // Replace with the real ID of the custom field

        // New data of the custom field
        const updateData = {
            name: 'edited_wasapi_test' // New name of the custom field
        };

        console.log(`📝 Updating field with ID: ${fieldId}`);
        console.log('📝 New data:', updateData);

        // Update the custom field
        const response = await wasapi.customFields.update({
            id: fieldId,
            data: updateData
        });

        console.log('✅ Custom field updated successfully:');

        if (response.success && response.data) {
            console.log('\n🎉 Custom field updated:');
            console.log(`   Previous name: ${updateData.name}`);
            console.log(`   ID: ${response.data.id}`);
            console.log(`   Actualizado: ${response.data.updated_at}`);
        } else {
            console.log('\n❌ Error updating the custom field:', response.success);
        }

    } catch (error) {
        console.error('❌ Error updating the custom field:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

updateCustomField();
