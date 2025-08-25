import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';

dotenv.config();


const client = new WasapiClient(process.env.API_KEY || '');

 async function getAllCampaignsExample() {
    try {
        console.log('📊 getting all campaigns...');

        const campaigns = await client.campaigns.getAll();
        console.log(`📈 Total campaigns: ${campaigns.count}`);
        
        // Show basic information of each campaign
        campaigns.data.forEach((campaign, index) => {
            console.log(`\n--- Campaign ${index + 1} ---`);
            console.log(`ID: ${campaign.id}`);
            console.log(`Nombre: ${campaign.name}`);
            console.log(`Estado: ${campaign.status}`);
            console.log(`Fecha de creación: ${campaign.created_at}`);
        });

        return campaigns;
    } catch (error) {
        console.error('❌ Error getting campaigns:', error);
        throw error;
    }
}

 async function getCampaignsWithFiltersExample() {
    try {
        console.log('📊 getting campaigns with filters...');
    
        // get all campaigns    
        const campaigns = await client.campaigns.getAll();
        
        // Simulate filters in the client
        const activeCampaigns = campaigns.data.filter(campaign => 
            campaign.status === 'sent'
        );
        
        const inactiveCampaigns = campaigns.data.filter(campaign => 
            campaign.status === 'cancel'
        );

        console.log(`✅ Active campaigns: ${activeCampaigns.length}`);
        console.log(`✅ Inactive campaigns: ${inactiveCampaigns.length}`);

        return { active: activeCampaigns, inactive: inactiveCampaigns };
    } catch (error) {
        console.error('❌ Error getting campaigns with filters:', error);
        throw error;
    }
}

// function to run all examples
 async function runAllExamples() {
    console.log('🚀 Starting campaigns examples...\n');

    try {
        // Run examples one by one
        await getAllCampaignsExample();
        console.log('----\n');

        await getCampaignsWithFiltersExample();
        console.log('----\n');
        console.log('✅ All campaigns examples executed successfully!');
    } catch (error) {
        console.error('💥 Error executing examples:', error);
    }
}

runAllExamples();