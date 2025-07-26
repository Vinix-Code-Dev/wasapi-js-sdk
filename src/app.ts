import dotenv from 'dotenv';
import { WasapiClient } from './wasapi';
import { CreateContact } from './wasapi/models';


dotenv.config();

const clientWasapi = new WasapiClient(process.env.API_KEY_WASAPI || '');

// const campaigns = await clientWasapi.campaigns.getAll();
// const contacts = await clientWasapi.contacts.getAll();

// const bot = await clientWasapi.bot.toggleStatus('573165170740', { from_id: '11689', action: 'disable_permanently' });

const contact = await clientWasapi.contacts.getSearch('cristian');


// const moveContact = await clientWasapi.funnels.moveContactToFunnel("0971143d-74c9-47dd-90e3-f20f2440fe58");
// // console.dir(contacts, { depth: null });

// Ejemplo de creación de contacto
// const nuevoContacto: CreateContact = {
//     first_name: 'Juan',
//     last_name: 'Pérez',
//     email: 'juan.perez@ejemplo.com',
//     country_code: '+57',`=
//     phone: '3001234567',
//     notes: 'Cliente potencial interesado en productos premium',
//     blocked: false,
//     unsubscribed: false,
//     labels: [1, 2], // IDs de etiquetas
//     custom_fields: {
//         gestion: 'TechCorp',
//         cargo: 'Desarrollador Senior',
//         fecha_registro: '2024-01-15'
//     }
// };

// try {
//     console.log('Creando contacto...');
//     const contactoCreado = await clientWasapi.contacts.create(nuevoContacto);
//     console.log('Contacto creado exitosamente:');
//     console.dir(contactoCreado, { depth: null });
// } catch (error) {
//     console.error('Error al crear el contacto:', error);
// }

