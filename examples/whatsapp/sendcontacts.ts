import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
import { SendContactParams, SendContacts } from '../../src/wasapi/models/SendContact.model';

dotenv.config();

/**
 * ejemplo de envio de contactos por whatsapp
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: contacto simple
export async function simpleContactExample() {
    try {
        console.log('📱 Enviando contacto simple...');

        const contact: SendContacts = {
            name: {
                formatted_name: 'Juan Pérez',
                first_name: 'Juan',
                last_name: 'Pérez'
            },
            phones: [
                {
                    phone: '3001234567',
                    type: 'CELL'
                }
            ]
        };

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            contacts: [contact]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Contacto simple enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar contacto simple:', error);
        throw error;
    }
}

// ejemplo 2: contacto completo con todos los campos
export async function completeContactExample() {
    try {
        console.log('📱 Enviando contacto completo...');

        const contact: SendContacts = {
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

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            contacts: [contact]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Contacto completo enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar contacto completo:', error);
        throw error;
    }
}

// ejemplo 3: contacto de empresa
export async function businessContactExample() {
    try {
        console.log('📱 Enviando contacto de empresa...');

        const contact: SendContacts = {
            name: {
                formatted_name: 'Carlos Rodríguez',
                first_name: 'Carlos',
                last_name: 'Rodríguez'
            },
            phones: [
                {
                    phone: '3155551234',
                    type: 'WORK'
                }
            ],
            emails: [
                {
                    email: 'carlos.rodriguez@startup.com',
                    type: 'WORK'
                }
            ],
            org: {
                company: 'StartupTech',
                department: 'Desarrollo',
                title: 'CEO'
            },
            addresses: [
                {
                    street: 'Carrera 15 #93-47',
                    city: 'Bogotá',
                    state: 'Cundinamarca',
                    zip: '110221',
                    country: 'Colombia',
                    country_code: 'CO',
                    type: 'WORK'
                }
            ]
        };

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            contacts: [contact]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Contacto de empresa enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar contacto de empresa:', error);
        throw error;
    }
}

// ejemplo 4: múltiples contactos
export async function multipleContactsExample() {
    try {
        console.log('📱 Enviando múltiples contactos...');

        const contact1: SendContacts = {
            name: {
                formatted_name: 'Ana Martínez',
                first_name: 'Ana',
                last_name: 'Martínez'
            },
            phones: [
                {
                    phone: '3201234567',
                    type: 'CELL'
                }
            ],
            emails: [
                {
                    email: 'ana.martinez@gmail.com',
                    type: 'HOME'
                }
            ]
        };

        const contact2: SendContacts = {
            name: {
                formatted_name: 'Pedro López',
                first_name: 'Pedro',
                last_name: 'López'
            },
            phones: [
                {
                    phone: '3009998888',
                    type: 'CELL'
                }
            ],
            org: {
                company: 'Consultoría López',
                department: 'Consultoría',
                title: 'Consultor Senior'
            }
        };

        const contact3: SendContacts = {
            name: {
                formatted_name: 'Laura Silva',
                first_name: 'Laura',
                last_name: 'Silva'
            },
            phones: [
                {
                    phone: '3112223333',
                    type: 'CELL'
                }
            ],
            birthday: '1985-12-03',
            emails: [
                {
                    email: 'laura.silva@hotmail.com',
                    type: 'HOME'
                }
            ]
        };

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            contacts: [contact1, contact2, contact3]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Múltiples contactos enviados:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar múltiples contactos:', error);
        throw error;
    }
}

// ejemplo 5: contacto con contexto de conversación
export async function contactWithContextExample() {
    try {
        console.log('📱 Enviando contacto con contexto...');

        const contact: SendContacts = {
            name: {
                formatted_name: 'Roberto Díaz',
                first_name: 'Roberto',
                last_name: 'Díaz'
            },
            phones: [
                {
                    phone: '3145556666',
                    type: 'CELL'
                }
            ],
            org: {
                company: 'Díaz & Asociados',
                department: 'Legal',
                title: 'Abogado'
            }
        };

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            context_wam_id: 'wamid.123456789', // ID del mensaje al que se responde
            contacts: [contact]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Contacto con contexto enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar contacto con contexto:', error);
        throw error;
    }
}

// ejemplo 6: contacto internacional
export async function internationalContactExample() {
    try {
        console.log('📱 Enviando contacto internacional...');

        const contact: SendContacts = {
            name: {
                formatted_name: 'John Smith',
                first_name: 'John',
                last_name: 'Smith'
            },
            phones: [
                {
                    phone: '15551234567',
                    type: 'CELL'
                }
            ],
            emails: [
                {
                    email: 'john.smith@company.com',
                    type: 'WORK'
                }
            ],
            addresses: [
                {
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zip: '10001',
                    country: 'United States',
                    country_code: 'US',
                    type: 'WORK'
                }
            ],
            org: {
                company: 'Global Tech Inc.',
                department: 'International Sales',
                title: 'Sales Manager'
            }
        };

        const params: SendContactParams = {
            wa_id: constants.CLIENT_WA_ID,
            from_id: parseInt(constants.MY_FROM_ID),
            contacts: [contact]
        };

        const result = await client.whatsapp.sendContacts(params);
        console.log('✅ Contacto internacional enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar contacto internacional:', error);
        throw error;
    }
}

// funcion para ejecutar todos los ejemplos
export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de envio de contactos...\n');

    try {
        // ejecutar ejemplos uno por uno
        await simpleContactExample();
        console.log('---\n');

        await completeContactExample();
        console.log('---\n');

        await businessContactExample();
        console.log('---\n');

        await multipleContactsExample();
        console.log('---\n');

        await contactWithContextExample();
        console.log('---\n');

        await internationalContactExample();
        console.log('---\n');

        console.log('🎉 Todos los ejemplos de envio de contactos ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecucion de ejemplos:', error);
    }
}
