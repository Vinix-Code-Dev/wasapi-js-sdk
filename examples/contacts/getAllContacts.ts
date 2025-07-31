// crea varios ejemplos para obtener todos los datos y la busqueda de contactos

import constants from 'examples/constants';
import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';

dotenv.config();

const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

export async function getAllContactsExample() {
    const contacts = await client.contacts.getAll();
    console.log(contacts.data.total);      

}

export async function searchContactsExample() {
    const contacts = await client.contacts.getSearch({search: 'Juan'});
    console.log(contacts.data.data[0].country_code);      
}

export async function getContactByIdExample() {
    const contact = await client.contacts.getById(constants.CLIENT_WA_ID);
   console.log(contact.data.first_name);      
}

export async function runAllExamples() {
    await getContactByIdExample();
}