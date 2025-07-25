import dotenv from 'dotenv';
import { WasapiClient } from './wasapi';


dotenv.config();

const clientWasapi = new WasapiClient(process.env.API_KEY_WASAPI || '');

const campaigns = await clientWasapi.getAllCampaigns();

console.dir(campaigns, { depth: null });

