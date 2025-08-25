import { WasapiClient } from '../../src/wasapi';
import { WorkflowStatuses } from '../../src/wasapi/models/shared/workflow.model';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Example: Get workflow statuses
 * 
 * This example demonstrates how to get the statuses of the workflows
 * with different filters and pagination parameters.
 */

async function getWorkflowStatuses() {
    try {
        // Initialize the Wasapi SDK
        const wasapi = new WasapiClient({
            apiKey: process.env.API_KEY || 'API_KEY',
        });

        console.log('📋 Getting workflow statuses...\n');

        // Parameters to get workflow statuses
        const workflowParams : WorkflowStatuses = {
            action: 'open', // Specific action (optional)
            dates: '2024-01-01,2024-12-31', // Date range (optional)
        };

        console.log('📝 Search parameters:', workflowParams);

        // Get workflow statuses
        const response = await wasapi.workflow.getStatuses(workflowParams);

        console.log('✅ Workflow statuses obtained successfully:');

        if (response.success && response.data) {
            console.log(`\n🎉 Found ${response.data.data.length} workflow statuses:`);
            
            response.data.data.forEach((status, index) => {
                console.log(`\n${index + 1}. Workflow status:`);
                console.log(`   ID: ${status.id}`);
                console.log(`   Order: ${status.order}`);
                console.log(`   Description: ${status.description}`);
                console.log(`   Name: ${status.name}`);
                console.log(`   Created at: ${status.created_at}`);
                console.log(`   Updated at: ${status.updated_at}`);
            });

            // Pagination information if available
            console.log('\n📄 Pagination information:');
            console.log(`   Current page: ${response.data.current_page}`);
            console.log(`   Total pages: ${response.data.last_page}`);
            console.log(`   Total elements: ${response.data.total}`);
            console.log(`   Elements per page: ${response.data.per_page}`); 
        } else {
            console.log('\n📝 No workflow statuses found or there was an error:', response.success);
        }

    } catch (error) {
        console.error('❌ Error getting workflow statuses:', error);
        
        if (error instanceof Error) {
            console.error('📝 Details of the error:', error.message);
        }
    }
}

getWorkflowStatuses();

