import { WasapiClient } from '../../src/wasapi';
import constants from '../../src/constants';
import dotenv from 'dotenv';
import { SendAttachmentParams } from '~/wasapi/models/message.model';


dotenv.config();

/**
 * ejemplo de envio de mensaje de whatsapp
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: mensaje simple
export async function simpleMessageExample() {
    try {
        console.log('📱 Enviando mensaje simple...');

        const params = {
            message: 'Hola! ¿Cómo estás? esto es un mensaje simple',
            wa_id: constants.CLIENT_WA_ID,
            from_id: constants.MY_FROM_ID
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje enviado exitosamente:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje simple:', error);
        throw error;
    }
}

// ejemplo 2: mensaje sin from_id (usa el default)
export async function withoutFromIdExample() {
    try {
        console.log('📱 Enviando mensaje sin from_id...');

        const params = {
            message: 'Hola! ¿Cómo estás? esto es un mensaje simple sin from_id',
            wa_id: constants.CLIENT_WA_ID
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje enviado sin from_id:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje sin from_id:', error);
        throw error;
    }
}

// ejemplo 3: mensaje largo
export async function longMessageExample() {
    try {
        console.log('📱 Enviando mensaje largo...');

        const longMessage = `
Hola! 👋

Estoy escribiendo para informarte sobre nuestras nuevas ofertas:

🔥 **Ofertas Especiales:**
• iPhone 15: $999 (antes $1,199)
• MacBook Pro: $1,499 (antes $1,799)
• AirPods Pro: $199 (antes $249)

📅 **Válido hasta:** 31 de enero de 2024

💳 **Métodos de pago:** Tarjeta, transferencia, efectivo

¿Te interesa alguna de estas ofertas? 😊

Saludos,
Equipo de Ventas
        `.trim();

        const params = {
            message: longMessage,
            wa_id: constants.CLIENT_WA_ID,
            from_id: constants.MY_FROM_ID
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje largo enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje largo:', error);
        throw error;
    }
}

// Exa`mple 4: Message with emojis`
export async function emojiMessageExample() {
    try {
        console.log('📱 Enviando mensaje con emojis...');

        const params = {
            message: '🎉 ¡Feliz cumpleaños! 🎂 ¡Esperamos que tengas un día maravilloso! 🎁✨',
            wa_id: constants.CLIENT_WA_ID,
            from_id: constants.MY_FROM_ID
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje con emojis enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje con emojis:', error);
        throw error;
    }
}

// ejemplo 5: mensaje de confirmacion
export async function confirmationMessageExample() {
    try {
        console.log('📱 Enviando mensaje de confirmacion...');

        const params = {
            message: '✅ Tu pedido #12345 ha sido confirmado y está siendo procesado. Te notificaremos cuando esté listo para envío.',
            wa_id: constants.CLIENT_WA_ID,
            from_id: constants.MY_FROM_ID
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje de confirmacion enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje de confirmacion:', error);
        throw error;
    }
}

// ejemplo 6: enviar un archivo multimedia a whatsapp
export async function sendAttachmentExample() {
    try {
        console.log('📱 Enviando archivo multimedia a whatsapp...');

        const params: SendAttachmentParams = {
            from_id: parseInt(constants.MY_FROM_ID),
            wa_id: constants.CLIENT_WA_ID,
            file: 'image_url',
            image_url: constants.URL_FILE_IMAGE,
            caption: 'Esta es una imagen de prueba usando metodo sendAttachment',
            filename: 'image.jpg'
        };

        const result = await client.whatsapp.sendAttachment(params);
        console.log('✅ Archivo multimedia enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar archivo multimedia:', error);
        throw error;
    }
}
// funcion para ejecutar todos los ejemplos
export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de envio de mensajes...\n');

    try {
        // Run examples one by one
        await simpleMessageExample();
        console.log('---\n');

        await withoutFromIdExample();
        console.log('---\n');

        await longMessageExample();
        console.log('---\n');

        await emojiMessageExample();
        console.log('---\n');

        await confirmationMessageExample();
        console.log('---\n');

        await sendAttachmentExample();
        console.log('---\n');

        console.log('🎉 Todos los ejemplos de envio de mensajes ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecucion de ejemplos:', error);
    }
}