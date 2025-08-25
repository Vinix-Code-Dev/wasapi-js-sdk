import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
import { SendContact, ContactWPP } from '../../src/wasapi/models';

dotenv.config();

/**
 * Complete example of sending contacts via WhatsApp with API verification
 */

// Client configuration
const client = new WasapiClient({
    apiKey: process.env.API_KEY || '',
    from_id: constants.MY_FROM_ID
});


// Complete contact example with all fields
async function sendCompleteContact() {
    const verifiedResult = await client.validateConnection();
    if (verifiedResult) {
        console.log('✅ Connection successful');
    } else {
        console.log('❌ Connection failed');
    }
    try {
        console.log('\n📱 === SENDING COMPLETE CONTACT ===');

        const contact: ContactWPP = {
            name: {
                formatted_name: 'María González',
                first_name: 'María',
                last_name: 'González',
                middle_name: 'Isabel',
                prefix: 'Sra.',
                suffix: 'MSc.'
            },
            birthday: '1990-05-15',
            phones: [
                {
                    phone: '3109876543',
                    type: 'CELL',
                    wa_id: '573109876543'
                },
                {
                    phone: '6012345678',
                    type: 'WORK'
                }
            ],
            emails: [
                {
                    email: 'maria.gonzalez@empresa.com',
                    type: 'WORK'
                },
                {
                    email: 'maria.gonzalez@gmail.com',
                    type: 'HOME'
                }
            ],
            addresses: [
                {
                    street: 'Calle 123 #45-67',
                    city: 'Bogotá',
                    state: 'Cundinamarca',
                    zip: '110111',
                    country: 'Colombia',
                    country_code: 'CO',
                    type: 'HOME'
                }
            ],
            org: {
                company: 'TechCorp Solutions',
                department: 'Marketing',
                title: 'Directora de Marketing'
            },
            urls: [
                {
                    url: 'https://linkedin.com/in/mariagonzalez',
                    type: 'LINKEDIN'
                }
            ]
        };

        const params: SendContact = {
            wa_id: constants.CLIENT_WA_ID,
            contacts: [contact]
        };

        console.log('📤 Sending complete contact...');
        const result = await client.whatsapp.sendContacts(params);

        console.log('✅ Complete contact sent:', result);
        return result;

    } catch (error) {
        console.error('❌ Error in complete contact:', error);
        throw error;
    }
}

sendCompleteContact();