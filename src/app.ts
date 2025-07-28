import dotenv from 'dotenv';
import { WasapiClient } from './wasapi';
import constants from './constants';


dotenv.config();

const clientWasapi = new WasapiClient(process.env.API_KEY_WASAPI || '');


// const message = await clientWasapi.whatsapp.sendMessage({
//     message: constants.MESSAGE,
//     wa_id: constants.CLIENT_WA_ID,
//     from_id: constants.MY_FROM_ID
// });

