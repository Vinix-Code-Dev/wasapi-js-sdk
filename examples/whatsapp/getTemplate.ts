// ejemplo de consulta de plantilla de whatsapp

import { WasapiClient } from '../../src/wasapi';
import constants from '../../src/constants';
import dotenv from 'dotenv';

dotenv.config();

const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo de consulta de plantilla de whatsapp

export async function getTemplate() {
    const template = await client.whatsapp.getWhatsappTemplate({ template_uuid: constants.TEMPLATE_UUID });
}
// llamar todas las plantillas de whatsapp

export async function getAllTemplates() {
    const templates = await client.whatsapp.getWhatsappTemplates();
    console.log(templates);
}
