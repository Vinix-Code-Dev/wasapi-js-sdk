import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Example: Get user information
 * 
 * This example demonstrates how to get the information of the user
 * manager of the Wasapi account.
 */

async function getUser() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('👤 Getting user information...\n');

        // Get user information
        const user = await wasapi.user.getUser();

        console.log('✅ User information obtained successfully:');

        if (user) {
            console.log('\n🎉 User information:');
            console.log(`   Name: ${user.name}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   ID: ${user.id}`);
            console.log(`   Role: ${user.role}`);
        console.log(`   Created at: ${user.created_at}`);
            console.log(`   Updated at: ${user.updated_at}`);
            
        } else {
            console.log('\n📝 No user information found or there was an error:', user);
        }

    } catch (error) {
        console.error('❌ Error getting user information:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getUser();

