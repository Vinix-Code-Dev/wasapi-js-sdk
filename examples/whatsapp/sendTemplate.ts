import { WasapiClient } from '../../src/wasapi';
import constants from '../../src/constants';
import dotenv from 'dotenv';
import { createVarList } from '~/utils/createVars';
import { SendTemplateParams } from '~/wasapi/models/template.model';


dotenv.config();

/**
 * ejemplo de envio de mensaje de plantilla de whatsapp
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

const templateBase: SendTemplateParams = {
    recipients: constants.CLIENT_WA_ID,
    template_id: constants.TEMPLATE_UUID,
    contact_type: 'phone',
    from_id: parseInt(constants.MY_FROM_ID),
    chatbot_status: 'enable',
    conversation_status: 'unchanged'
}

// ejemplo 1: mensaje simple con variables
export async function simpleTemplateExample() {
    try {
        console.log('📱 Enviando mensaje de plantilla simple...');

        const templateParams: SendTemplateParams = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID,
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ plantilla enviada exitosamente :', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar plantilla simple:', error);
        throw error;
    }
}

// ejemplo 2: mensaje con variables
export async function varsTemplateExample() {
    try {
        console.log('📱 Enviando mensaje de plantilla con variables...');

        const templateParams: SendTemplateParams = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID_EXAMPLE_VARIABLES,
            body_vars: createVarList('Camilo', 'wasapi', '1234445'),
        };

        const result = await client.whatsapp.sendTemplate(templateParams);
        console.log('✅ plantilla enviada exitosamente con variables:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar plantilla con variables:', error);
        throw error;
    }
}

// mensaje con archivo multimedia imagen o video

export async function ImageTemplateExample() {
    try {
        console.log('📱 Enviando mensaje de plantilla con archivo multimedia...');

        const templateParams: SendTemplateParams = {
            ...templateBase,
            template_id: constants.TEMPLATE_UUID_FILE_IMAGE,
            file: 'image' as const,
            file_name: 'image.jpg',
            url_file: constants.URL_FILE_IMAGE,

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
    console.log('🚀 Iniciando ejemplos de envio de plantilla\n');

    try {
        // Run examples one by one
        await simpleTemplateExample();
        console.log('---\n');

        await varsTemplateExample();
        console.log('---\n');

        await ImageTemplateExample();
        console.log('---\n');


        console.log('🎉 Ejemplos de envio de plantilla ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecucion de ejemplos:', error);
    }
}
