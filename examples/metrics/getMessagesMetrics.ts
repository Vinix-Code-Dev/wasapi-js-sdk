import { WasapiClient } from "../../src/wasapi";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Example: Get messages metrics
 * 
 * This example demonstrates how to get metrics related
 * to messages and conversations in a date range.
 */


async function getMessagesMetrics() {   
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('💬 Getting messages metrics...\n');

        // Date parameters (last 30 days)
        const endDate = new Date().toISOString().split('T')[0]; // Current date
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago

        const dateParams = {
            startDate: startDate,
            endDate: endDate
        };

        console.log('📅 Date range:', dateParams);

        // Get different messages metrics
        console.log('\n🔍 Getting different messages metrics...\n');

        // 1. General messages metrics
        console.log('📨 Getting general messages metrics...');
        const messages = await wasapi.metrics.getMessages(dateParams);
        //messages in and out
        console.log('✅ General messages metrics:', `in: ${messages.messages.in} out: ${messages.messages.out}`);

        // 2. Bot messages metrics
        console.log('\n🤖 Getting bot messages metrics...');
        const messagesBot = await wasapi.metrics.getMessagesBot(dateParams);
        console.log('✅ Bot messages metrics:', messagesBot.data);


        // 3. Consolidated conversations
        console.log('\n📊 Getting consolidated conversations...');
        const consolidatedConversations = await wasapi.metrics.getConsolidatedConversations(dateParams);
        console.log('✅ Consolidated conversations:', consolidatedConversations.conversations);

        // 4. Agent conversations
        console.log('\n👥 Getting agent conversations...');
        const agentConversations = await wasapi.metrics.getAgentConversations(dateParams);
        console.log('✅ Agent conversations:', agentConversations.conversations);

        console.log('\n🎉 All messages metrics obtained successfully!');

    } catch (error) {
        console.error('❌ Error getting messages metrics:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}


getMessagesMetrics();
