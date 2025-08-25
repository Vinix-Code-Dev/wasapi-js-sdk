import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
* example: Delete a custom field
 * 
 * This example demonstrates how to delete an existing custom field
 * using its ID.
 */

async function deleteCustomField() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('🗑️ Deleting custom field...\n');

        // ID of the custom field to delete (you must replace with a real ID)
        const fieldId = '4487'; // Replace with the real ID of the custom field

        console.log(`📝 Deleting field with ID: ${fieldId}`);

        // Delete the custom field
        const response = await wasapi.customFields.delete(fieldId);

        console.log('✅ Custom field deleted successfully:');
        console.log('📊 Response:', response);

        if (response.success) {
            console.log(`\n🎉 Custom field with ID ${fieldId} has been deleted correctly`);
        } else {
            console.log('\n❌ Error deleting the custom field:', response.success);
        }

    } catch (error) {
        console.error('❌ Error deleting the custom field:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

deleteCustomField();
