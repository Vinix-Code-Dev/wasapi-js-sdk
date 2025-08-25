
import { WasapiClient } from '../../src/wasapi';
import { secondsToCompactFormat } from '../utils/timeConverter';
import constants from '../constants';
import dotenv from 'dotenv';
dotenv.config();

/**
 * example: Get agent metrics
 * 
 * This example demonstrates how to get different types of metrics
 * for a specific agent in a date range.
 */

async function getAgentMetrics() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('📈 Getting agent metrics...\n');

        // Date parameters (last 7 days)
        const endDate = new Date().toISOString().split('T')[0]; // Current date
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days ago

        const dateParams = {
            startDate,
            endDate: endDate    
        };

        const agentId = constants.AGENT_ID; // Replace with the actual ID of the agent

        console.log('👤 Agent ID:', agentId);
        console.log('📅 Date range:', dateParams);

        // Get different types of metrics for the agent
        console.log('\n🔍 Getting different metrics...\n');

        // 1. Agent response time
        console.log('⏱️ Getting agent response time...');
        const timeResponse = await wasapi.metrics.getAgentTimeResponse({
            agentId: agentId,
            ...dateParams
        });
        console.log('✅ Agent response time:', timeResponse.data);

        // 2. Transferred requests
        console.log('\n🔄 Getting transferred requests...');
        const transferred = await wasapi.metrics.getAgentTransferred({
            agentId: agentId,
            ...dateParams
        });
        console.log('✅ Transferred requests:', transferred.data);

        // 3. Volumen de trabajo
        console.log('\n💼 Getting volume of work...');
        const volumeOfWork = await wasapi.metrics.getAgentVolumeOfWork({
            agentId: agentId,
            ...dateParams
        });
        console.log('✅ Volume of work:', volumeOfWork.data);

        // 4. Tiempo en conversación
        console.log('\n💬 Getting time in conversation...');
        const timeInConversation = await wasapi.metrics.getAgentTimeInConversation({
            agentId: agentId,
            ...dateParams
        });
        console.log('✅ Time in conversation:', timeInConversation.data);
        
        // Convertir el tiempo en conversación a formato legible
        if (timeInConversation.success && typeof timeInConversation.data === 'number') {
            const readableTime = secondsToCompactFormat(timeInConversation.data);
            console.log(`   📅 Tiempo en conversación: ${readableTime}`);
        }       

        console.log('\n🎉 All agent metrics obtained successfully!');

    } catch (error) {
        console.error('❌ Error getting agent metrics:', error);
        
        if (error instanceof Error) {
            console.error('📝 Detalles del error:', error.message);
        }
    }
}



getAgentMetrics();