import constants from '../constants';
import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';

dotenv.config();

const client = new WasapiClient(process.env.API_KEY || '');

 async function getAllContactsExample() {
    const contacts = await client.contacts.getAll();
    console.log(contacts.data.total);      

}

 async function searchContactsExample() {
    const contacts = await client.contacts.getSearch({search: 'Daniel'});
    console.log(contacts.data.data[0]);      
}

 async function getContactByIdExample() {
    const contact = await client.contacts.getById(constants.CLIENT_WA_ID);
   console.log(contact.data.first_name);      
}

 async function runAllExamples() {
    console.log('🚀 Starting contact examples...\n');
    await getContactByIdExample();
    console.log('----\n');
    await getAllContactsExample();
    console.log('----\n');
    await searchContactsExample();
    console.log('✅ All contact examples executed successfully!');
}

runAllExamples();