import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Ejemplo: Obtener estado de los contactos
 * 
 * Este ejemplo demuestra cómo obtener el estado general
 * de los contactos en la plataforma.
 */

async function getStatusContacts() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('📊 Getting status of contacts...\n');

        // Get status of contacts
        const response = await wasapi.metrics.getStatusContacts();

        console.log('✅ Status of contacts obtained successfully:');

        if (response.success && response.data) {
            console.log('\n🎉 Status of contacts:');
            console.log(`   Total contacts: ${response.data.enabled || 0}`);
            console.log(`   Active contacts: ${response.data.active || 0}`);
            console.log(`   Blocked contacts: ${response.data.blocked || 0}`);
        } else {
            console.log('\n📝 No status of contacts found or there was an error:', response.success);
        }

    } catch (error) {
        console.error('❌ Error getting status of contacts:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}           
getStatusContacts();


