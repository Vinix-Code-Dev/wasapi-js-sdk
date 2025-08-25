import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
import { CreateCustomField } from '../../src/wasapi/models/request/customField.model';
dotenv.config();

/**
 * example: Create a new custom field
 * 
 * This example demonstrates how to create a new custom field
 * to store additional information of the contacts.
 */

async function createCustomField() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('➕ Creating new custom field...\n');

        // Data of the new custom field
        const newFieldData : CreateCustomField = {
            name: 'wasapi_test' // Name of the custom field
        };

        console.log('📝 Data of the custom field to create:', newFieldData);

        // Create the new custom field
        const response = await wasapi.customFields.create(newFieldData);

        console.log('✅ Custom field created successfully:');
        if (response.success && response.data) {
            console.log('\n🎉 Custom field created:');
            console.log(`   Nombre: ${response.data.field_name}`);
            console.log(`   ID: ${response.data.id}`);
            console.log(`   Creado: ${response.data.created_at}`);
        } else {
            console.log('\n❌ Error creating the custom field:', response.success);
        }

    } catch (error) {
        console.error('❌ Error creating the custom field:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

createCustomField();