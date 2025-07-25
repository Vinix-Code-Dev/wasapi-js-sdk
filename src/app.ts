import dotenv from 'dotenv';
import { WasapiClient } from "./wasapi/client";

dotenv.config();

const clientWasapi = new WasapiClient(process.env.API_KEY_WASAPI || '');

const contacts = await clientWasapi.getAllContacts();

console.dir(contacts, { depth: null });

