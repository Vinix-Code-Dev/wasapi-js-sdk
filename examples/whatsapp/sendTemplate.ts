import { WasapiClient } from '../../src/wasapi';
import constants from '../../src/constants';
import dotenv from 'dotenv';


dotenv.config();

/**
 * ejemplo de envio de mensaje de plantilla de whatsapp
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: mensaje simple con variables
export async function simpleTemplateExample() {
    try {
        console.log('📱 Enviando mensaje de plantilla simple...');

        const templateParams = {
            recipients: constants.CLIENT_WA_ID,
            template_id: constants.TEMPLATE_UUID,
            contact_type: 'phone' as const,
            from_id: parseInt(constants.MY_FROM_ID),
            chatbot_status: 'enable' as const,
            conversation_status: 'open' as const
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ plantilla enviada exitosamente :', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar plantilla simple:', error);
        throw error;
    }
}

// ejemplo 2: mensaje con archivo multimedia
export async function fileTemplateExample() {
    try {
        console.log('📱 Enviando mensaje de plantilla con archivo multimedia...');

        const templateParams = {
            recipients: constants.CLIENT_WA_ID,
            template_id: constants.TEMPLATE_UUID_FILE_PDF,
            contact_type: 'phone' as const,
            from_id: parseInt(constants.MY_FROM_ID),
            file: 'document' as const,
            body_vars: [
                { text: 'nombre', val: 'Mary' },
                { text: 'empresa', val: 'wasapi' }
            ],
            url_file: 'https://example.com/catalog.pdf',
            file_name: 'Product_Catalog_2024.pdf',
            header_var: [
                { text: 'url', val: 'https://example.com/promo.jpg' }
            ],
            chatbot_status: 'disable' as const,
            conversation_status: 'hold' as const
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ plantilla enviada exitosamente con archivo multimedia:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar plantilla con archivo multimedia:', error);
        throw error;
    }
}



// Function to run all examples
export async function runAllExamples() {
    console.log('🚀 Starting sendTemplate examples...\n');

    try {
        // Run examples one by one
        await simpleTemplateExample();
        console.log('---\n');

        // await fileTemplateExample();
        // console.log('---\n');


        console.log('🎉 All sendTemplate examples executed successfully!');
    } catch (error) {
        console.error('💥 Error in examples execution:', error);
    }
}
