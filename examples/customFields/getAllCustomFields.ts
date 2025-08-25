import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * example: Get all custom fields
 * 
 * This example demonstrates how to get the complete list of custom fields
 * configured in the Wasapi account.
 */

async function getAllCustomFields() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('📋 Getting all custom fields...\n');

        // Get all custom fields
        const response = await wasapi.customFields.getAll();

        console.log('✅ Custom fields obtained successfully:');

        if (response.success && response.data) {
            console.log(`\n🎉 Found ${response.data.length} custom fields:`);
            
            response.data.forEach((field, index) => {
                console.log(`\n${index + 1}. Field: ${field.field_name}`);
                console.log(`   ID: ${field.id}`);
                console.log(`   Creado: ${field.created_at}`);
                console.log(`   Actualizado: ${field.updated_at}`);
            });
        } else {
            console.log('\n📝 No custom fields found or there was an error:', response.success);
        }

    } catch (error) {
        console.error('❌ Error getting the custom fields:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getAllCustomFields();
