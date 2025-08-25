import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Example: Get online agents
 * 
 * This example demonstrates how to get the list of agents
 * that are currently online on the platform.
 */

async function getOnlineAgents() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('👥 Getting online agents...\n');

        // Get online agents
        const response = await wasapi.metrics.getOnlineAgents();

        console.log('✅ Online agents obtained successfully:');

        if (response.success && response.users) {
            console.log(`\n🎉 Found ${response.users.length} online agents:`);
            
            response.users.forEach((agent, index) => {
                console.log(`\n${index + 1}. Agent: ${agent.name}`);
                console.log(`   ID: ${agent.id}`);
                console.log(`   Email: ${agent.email}`);
                console.log(`   IP address: ${agent.ip_address}`);
                console.log(`   Last activity: ${agent.last_activity}`);
            });
        } else {
            console.log('\n📝 No online agents found or there was an error:', response.success);
        }

    } catch (error) {
            console.error('❌ Error getting online agents:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getOnlineAgents();

