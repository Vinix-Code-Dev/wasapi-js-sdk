// ejemplo de consulta de plantilla de whatsapp

import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';

dotenv.config();

const client = new WasapiClient(process.env.API_KEY || '');

// ejemplo de consulta de plantilla de whatsapp

async function getTemplate() {
    const template = await client.whatsapp.getWhatsappTemplate({ template_uuid: constants.TEMPLATE_UUID });
    console.log(template);
}
// llamar todas las plantillas de whatsapp

export async function getAllTemplates() {
    const templates = await client.whatsapp.getWhatsappTemplates();
    console.log(templates);
}

getTemplate();
//getAllTemplates();