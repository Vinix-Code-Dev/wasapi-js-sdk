import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
import constants from '../constants';
dotenv.config();

/**
 * example: Move a contact to another stage of the funnel
 * 
 * This example demonstrates how to move a contact from its current stage
 * to a new stage within the same funnel.
 */

async function moveContactToFunnel() {
    try {
        // Initialize the Wasapi SDK
    const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('🔄 Moving contact to new stage of the funnel...\n');

        // Parameters to move the contact
        const moveParams = {
            funnelContactId: constants.FUNNEL_CONTACT_ID, // ID of the contact to move
            toStageId: 208 //The destination stage ID can be seen in the getAllFunnels response.
        };

        console.log('📝 Move parameters:', moveParams);

        // Move the contact to the new stage
        const response = await wasapi.funnels.moveContactToFunnel(moveParams);

        console.log('✅ Contact moved successfully:');

        if (response.success) {
            console.log('\n🎉 Contact moved successfully:');
            console.log(`   Contact ID: ${moveParams.funnelContactId}`);
            console.log(`   New stage ID: ${moveParams.toStageId}`);
            console.log(`   Status: ${response.success || 'Move successful'}`);
        } else {
            console.log('\n❌ Error moving the contact:', response.success);
        }

    } catch (error) {
        console.error('❌ Error moving the contact:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

moveContactToFunnel();