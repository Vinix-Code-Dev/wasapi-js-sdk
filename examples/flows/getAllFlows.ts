import constants from '../constants';
import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
import { GetFlowAssets, GetFlowResponses, SendFlow } from '../../src/wasapi/models/request/flow.model';

dotenv.config();

const client = new WasapiClient({
    apiKey: process.env.API_KEY || '',
    from_id: constants.MY_FROM_ID
});

async function getAllFlowsExample() {
    try {
        // get all WhatsApp flows
        const flows = await client.whatsapp.getFlows();
        
        console.log('=== All WhatsApp Flows ===');        
        if (flows.data && flows.data.length > 0) {
            console.log(`\nTotal phone numbers with flows: ${flows.data.length}`);
            
            flows.data.forEach((phoneFlow, phoneIndex) => {
                console.log(`\n📱 Teléfono ${phoneIndex + 1}:`);
                console.log(`   ID: ${phoneFlow.phone.id}`);
                console.log(`   Phone number: ${phoneFlow.phone.phone_number}`);
                console.log(`   Name: ${phoneFlow.phone.display_name}`);
                console.log(`   Success: ${phoneFlow.success}`);
                
                if (phoneFlow.error) {
                    console.log(`   Error: ${phoneFlow.error}`); // error message
                }
                
                if (phoneFlow.flows && phoneFlow.flows.data && phoneFlow.flows.data.length > 0) {
                    console.log(`   Total flows: ${phoneFlow.flows.data.length}`);
                    
                    phoneFlow.flows.data.forEach((flow, flowIndex) => {
                        console.log(`\n   🔄 Flow ${flowIndex + 1}:`);
                        console.log(`      ID: ${flow.id}`);
                        console.log(`      Nombre: ${flow.name}`);
                        console.log(`      Estado: ${flow.status}`);
                        
                        if (flow.categories && flow.categories.length > 0) {
                            console.log(`      Categories: ${flow.categories.join(', ')}`);
                        }
                        
                        if (flow.validation_errors && flow.validation_errors.length > 0) {
                            console.log(`      Validation errors: ${flow.validation_errors.length}`);
                        }
                    });
                } else {
                    console.log('   No flows available for this number.');
                }
                console.log('   ---');
            });
        } else {
            console.log('No WhatsApp flows found.');
        }
    } catch (error) {
        console.error('Error getting WhatsApp flows:', error);
    }
}

async function sendFlowExample() {
    try {
        console.log('\n=== Sending Flow Example ===');
        
        const flow : SendFlow = {
            wa_id: constants.CLIENT_WA_ID,
            message: 'hello this is a test with a flow',
            phone_id: 9128,
            cta: 'Question Test',
            screen: 'QUESTION_ONE',
            flow_id: constants.FLOW_ID, 
            action: 'navigate' as const
        };
        
        console.log('Sending flow...');
        const result = await client.whatsapp.sendFlow(flow);
        console.log('✅ Flow sent successfully:', result);
    } catch (error) {
        console.error('Error sending flow:', error);
    }
}

async function getFlowResponsesExample() {
    try {
        // Example of getting responses from a flow
        console.log('\n=== Getting Flow Responses Example ===');
        
        const responseParams : GetFlowResponses = {
            flow_id: constants.FLOW_ID
        };
        
        const responses = await client.whatsapp.getFlowResponses(responseParams);
        console.log('Flow responses:', responses);
        
    } catch (error) {
        console.error('Error getting flow responses:', error);
    }
}

async function getFlowAssetsExample() {
    try {
        // Example of getting assets from a flow
        console.log('\n=== Getting Flow Assets Example ===');
        
        const assetsParams : GetFlowAssets = {
            flow_id: constants.FLOW_ID,
            phone_id: 9128
        };
        
        console.log('Flow assets parameters:');
        console.log(JSON.stringify(assetsParams, null, 2));
        
        const assets = await client.whatsapp.getFlowAssets(assetsParams);
        console.log('Flow assets:', assets);
        
    } catch (error) {
        console.error('Error getting flow assets:', error);
    }
}

async function analyzeFlowCategoriesExample() {
    try {
        // Analyze the categories of available flows
        console.log('\n=== Analyzing Flow Categories Example ===');
        
        const flows = await client.whatsapp.getFlows();
        
        if (flows.data && flows.data.length > 0) {
            const categoryCount: { [key: string]: number } = {};
            const statusCount: { [key: string]: number } = {};
            
            flows.data.forEach(phoneFlow => {
                if (phoneFlow.flows && phoneFlow.flows.data) {
                    phoneFlow.flows.data.forEach(flow => {
                        // Count states
                        statusCount[flow.status] = (statusCount[flow.status] || 0) + 1;
                        
                        // Count categories
                        if (flow.categories) {
                            flow.categories.forEach(category => {
                                categoryCount[category] = (categoryCount[category] || 0) + 1;
                            });
                        }
                    });
                }
            });
            
            console.log('\n📊 Status statistics:');
            Object.entries(statusCount).forEach(([status, count]) => {
                console.log(`   ${status}: ${count} flows`);
            });
            
            console.log('\n📊 Category statistics:');
            Object.entries(categoryCount).forEach(([category, count]) => {
                console.log(`   ${category}: ${count} flows`);
            });
        } else {
            console.log('No flows available to analyze.');
        }
    } catch (error) {
        console.error('Error analyzing flow categories:', error);
    }
}

async function runAllExamples() {
   console.log('🚀 Starting WhatsApp flows examples...\n');
    
    await getAllFlowsExample();
    await sendFlowExample();
    await getFlowResponsesExample();
    await getFlowAssetsExample();
    await analyzeFlowCategoriesExample();
    
    console.log('\n✅ All WhatsApp flows examples have been executed.');
} 

runAllExamples();


