import { BotStatusParams } from '../../src/wasapi/models';
import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
dotenv.config();

/**
 * example: change the bot status for a contact
 * 
 * This example demonstrates how to activate or deactivate the bot for a specific contact
 * using the toggleStatus method of the Bot module.
 */

async function toggleBotStatus() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'tu-api-key-aqui',
        });

        console.log('🤖 starting bot status change...\n');

        // Data to change the bot status
        const botToggle : BotStatusParams = {
            wa_id: constants.CLIENT_WA_ID, // WhatsApp contact number
            data: {
                from_id: constants.MY_FROM_ID,
                action: 'enable'  as const  // enable to activate, disable to deactivate
            }
        };

        // Execute the bot status change
        const response = await wasapi.bot.toggleStatus(botToggle);

        console.log('✅ Bot status changed successfully:');
        console.log('📊 Respuesta:', response.success);

        if (response.success) {
            console.log(`\n🎉 the bot has been disabled ${response.disabled} for the contact ${constants.CLIENT_WA_ID}`);
            console.log('📊 disabled:', response.disabled);
            console.log('📊 permanent disabled:', response.permanent);
        } else {
            console.log('\n❌ Error changing the bot status:', response.success);
        }

    } catch (error) {
        console.error('❌ Error changing the bot status:', error);
        
        if (error instanceof Error) {
            console.error('📝 Detalles del error:', error.message);
        }
    }
}

toggleBotStatus();