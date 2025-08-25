import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
import { createVarList } from '../../src/wasapi/utils/createVars';
import { SendTemplate } from '../../src/wasapi/models';


dotenv.config();

/**
 * WhatsApp template sending examples
 */

// client configuration with from_id included
const client = new WasapiClient({
    apiKey: process.env.API_KEY || '',
    from_id: constants.MY_FROM_ID
});
const templateBase: SendTemplate = {
    recipients: constants.CLIENT_WA_ID,
    template_id: '',
    contact_type: 'phone',
    chatbot_status: 'enable',
    conversation_status: 'unchanged'
    // from_id is automatically used from client configuration
}

// example 1: simple message
async function simpleTemplateExample() {
    try {
        console.log('📱 sending simple template message...');

        const templateParams: SendTemplate = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID,
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ template message sent successfully:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending simple template message:', error);
        throw error;
    }
}

// example 2: message with variables
async function varsTemplateExample() {
    try {
        console.log('📱 sending template message with variables...');

        const templateParams: SendTemplate = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID_EXAMPLE_VARIABLES,
            body_vars: createVarList('Camilo', 'wasapi', '1234445'),
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ template message sent successfully with variables:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending template message with variables:', error);
        throw error;
    }
}

// message with multimedia image or video

 async function ImageTemplateExample() {

    try {
        console.log('📱 sending template message with multimedia image or video...');

        const templateParams: SendTemplate = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID_FILE_IMAGE,
            url_file: constants.URL_FILE_IMAGE,
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ template message sent successfully with multimedia image or video:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending template message with multimedia image or video:', error);
        throw error;
    }
}  

// message with multimedia pdf

async function PdfTemplateExample() {
    try {
        console.log('📱 sending template message with multimedia pdf...');

        const templateParams: SendTemplate = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID_FILE_PDF,
            body_vars: createVarList('Camilo', 'wasapi', 'wasapi'),
            url_file: constants.URL_FILE_PDF,
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ template message sent successfully with multimedia pdf:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending template message with multimedia pdf:', error);
        throw error;
    }
}

// Function to run all examples
 async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de envio de plantilla\n');

    try {
        // Run examples one by one
        await simpleTemplateExample();
        console.log('---\n');

        await varsTemplateExample();
        console.log('---\n');

        await ImageTemplateExample();
        console.log('---\n');

        await PdfTemplateExample();
        console.log('---\n');
        console.log('🎉 Template sending examples executed successfully!');
    } catch (error) {
        console.error('💥 Error executing template sending examples:', error);
    }
}


runAllExamples();