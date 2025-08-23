import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
import { SendAttachmentParams } from '../../src/wasapi/models';


dotenv.config();

/**
 * ejemplo de envio de mensaje de whatsapp
 */

// configuracion del cliente con from_id incluido
const client = new WasapiClient({
    apiKey: process.env.API_KEY_WASAPI || '',
    from_id: constants.MY_FROM_ID
});


// ejemplo 1: mensaje simple (sin necesidad de especificar from_id)
export async function simpleMessageExample() {
    try {
        console.log('📱 Enviando mensaje simple...');

        const params = {
            message: 'Hola! ¿Cómo estás? esto es un mensaje simple',
            wa_id: constants.CLIENT_WA_ID
            // from_id se usa automáticamente desde la configuración del cliente
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje enviado exitosamente:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje simple:', error);
        throw error;
    }
}

// ejemplo 2: mensaje con from_id personalizado (override)
export async function customFromIdExample() {
    try {
        console.log('📱 Enviando mensaje con from_id personalizado...');

        const params = {
            message: 'Hola! ¿Cómo estás? esto es un mensaje con from_id personalizado',
            wa_id: constants.CLIENT_WA_ID,
            from_id: '99999' // Override del from_id por defecto
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje enviado con from_id personalizado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje con from_id personalizado:', error);
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
            wa_id: constants.CLIENT_WA_ID
            // from_id se usa automáticamente desde la configuración del cliente
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Mensaje largo enviado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al enviar mensaje largo:', error);
        throw error;
    }
}

// Example 4: Message with emojis
export async function emojiMessageExample() {
    try {
        console.log('📱 Enviando mensaje con emojis...');

        const params = {
            message: '🎉 ¡Feliz cumpleaños! 🎂 ¡Esperamos que tengas un día maravilloso! 🎁✨',
            wa_id: constants.CLIENT_WA_ID
            // from_id se usa automáticamente desde la configuración del cliente
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
            wa_id: constants.CLIENT_WA_ID
            // from_id se usa automáticamente desde la configuración del cliente
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
            wa_id: constants.CLIENT_WA_ID,
            filePath: constants.URL_FILE_IMAGE,
            caption: 'Esta es una imagen de prueba usando metodo sendAttachment',
            filename: 'image.jpg'
            // from_id se usa automáticamente desde la configuración del cliente
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

        await customFromIdExample();
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