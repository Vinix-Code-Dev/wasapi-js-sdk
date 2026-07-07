import { WasapiClient } from '../../src/wasapi';
import { CreateCampaignRequest } from '../../src/wasapi/models';
import constants from '../constants';
import dotenv from 'dotenv';

dotenv.config();

const client = new WasapiClient({
    apiKey: 'xxxxxxxxxxxxxxxxs',
    from_id: 324324
});
/* const label_id = 241430; */
const template_uuid = '96d3b0d2-1f3b-45bc-bc1c-00fb2d4d7094';
const template_without_variables = 'e53c9498-d021-4c4a-8fa3-42d3a8f6cd89';
const campaign_id = '4af16299-ab1d-47dd-b424-edada8983e76';

// example 1: create and send a campaign immediately
async function createCampaignExample() {
    try {
        console.log('📣 creating campaign...');

        const data: CreateCampaignRequest = {
            name: 'Campaña DESDE SDK DE NODEJS',
            description: 'Envío masivo a clientes VIP desde SDK de NodeJS',
            template_uuid: template_uuid,
            phone_id: 18124,
            recipients: {
                type: 'phones',
                values: ['573214614019', '573174076990']
            },
            variables: {
                body: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4']
            },
            conversation_status: 'closed',
            disable_chatbot: false
        };

        const result = await client.campaigns.create(data);
        console.log('✅ campaign created:', result.data.uuid);
        console.log('   total contacts matched:', result.recipients.matched);
        if (result.recipients.skipped.length > 0) {
            console.log('   skipped phones:', result.recipients.skipped);
        }
        return result;
    } catch (error) {
        console.error('❌ Error creating campaign:', error);
        throw error;
    }
}

// example 2: create a scheduled campaign
async function createScheduledCampaignExample() {
    try {
        console.log('📅 creating scheduled campaign...');

        const data: CreateCampaignRequest = {
            name: 'Campaña Navidad 2026',
            template_uuid: template_without_variables,
            phone_id: 18124,
            recipients: {
                type: 'phones',
                values: ['573174076990']
            },
            //y-m-d H:i:s
            scheduled_at: '2026-07-07 11:56',
            conversation_status: 'open'
        };

        const result = await client.campaigns.create(data);
        console.log('✅ scheduled campaign created:', result.data.uuid);
        console.log('   scheduled at:', result.data.scheduled_at);
        return result;
    } catch (error) {
        console.error('❌ Error creating scheduled campaign:', error);
        throw error;
    }
}

// example 3: get delivery stats for a campaign
async function getCampaignStatsExample() {
    try {
        console.log('📊 fetching campaign stats...');

        const stats = await client.campaigns.getStats(campaign_id);
        console.log('✅ campaign stats:');
        for (const [status, count] of Object.entries(stats.data)) {
            console.log(`   ${status}: ${count}`);
        }
        return stats;
    } catch (error) {
        console.error('❌ Error fetching campaign stats:', error);
        throw error;
    }
}

// example 4: get delivery logs for a campaign (all pages)
async function getCampaignLogsExample() {
    try {
        console.log('📋 fetching campaign logs...');

        let cursor: string | undefined = undefined;
        let page = 1;

        do {
            const logs = await client.campaigns.getLogs(campaign_id, {
                per_page: 50,
                cursor
            });

            console.log(`   page ${page} — ${logs.data.length} entries`);
            for (const entry of logs.data) {
                console.log(`   contact ${entry.contact_id} (${entry.phone}): ${entry.message_status ?? entry.status}`);
                if (entry.error) console.log(`     error: ${entry.error}`);
            }

            if (!logs.pagination.has_more) break;
            cursor = logs.pagination.next_cursor ?? undefined;
            page++;
        } while (cursor);

        console.log('✅ all log pages fetched');
    } catch (error) {
        console.error('❌ Error fetching campaign logs:', error);
        throw error;
    }
}

async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de campañas\n');

    try {
        /* await createCampaignExample(); */
        console.log('---\n');

        /* await createScheduledCampaignExample(); */
        console.log('---\n');

        await getCampaignStatsExample();
        console.log('---\n');

        await getCampaignLogsExample();
        console.log('---\n');

        console.log('🎉 Campaign examples executed successfully!');
    } catch (error) {
        console.error('💥 Error executing campaign examples:', error);
    }
}

runAllExamples();
