import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
import constants from '../constants';
dotenv.config();

/**
 * example: Search a contact in funnels
 * 
 * This example demonstrates how to search a specific contact
 * in all funnels using its phone number or UUID.
 */

async function searchContactInFunnel() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('🔍 Searching contact in funnels...\n');

        // Search parameters (you can use phoneNumber or contactUuid)
        const searchParams = {
            phoneNumber: constants.CLIENT_WA_ID, // Phone number of the contact
            // contactUuid: 'uuid-of-the-contact' // Alternative: use the contact UUID
        };

        console.log('📝 Search parameters:', searchParams);

        // Search the contact in funnels
        const response = await wasapi.funnels.searchContact(searchParams);

        console.log('✅ Search completed successfully:');

        if (response.data.uuid) {
            console.log(`\n🎉 Contact found in ${response.data.stage.name} funnel stage:`);
            
            console.log(`   Contact name: ${response.data.contact.first_name} ${response.data.contact.last_name}`);
            console.log(`   Contact phone: ${response.data.contact.phone}`);
            console.log(`   Funnel stage ID: ${response.data.stage.id}`);
            console.log(`   Entry date: ${response.data.created_at}`);
        } else {
            console.log('\n📝 Contact not found in any funnel or there was an error:', response.menssage);
        }

    } catch (error) {
        console.error('❌ Error searching the contact in funnels:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

searchContactInFunnel();

