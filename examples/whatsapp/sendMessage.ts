import { WasapiClient } from '../../src/wasapi';
import constants from '../constants';
import dotenv from 'dotenv';
import { SendAttachmentParams, SendMessage } from '../../src/wasapi/models';


dotenv.config();

/**
 * Simplified WhatsApp message sending examples
 */

// Client configuration
const client = new WasapiClient({
    apiKey: process.env.API_KEY || '',
    from_id: constants.MY_FROM_ID
});

// Example 1: Simple message (uses default from_id)
export async function simpleMessageExample() {
    try {
        console.log('📱 Sending simple message...');

        const params : SendMessage = {
            message: 'Hello! How are you? This is a test message.',
            wa_id: constants.CLIENT_WA_ID
            // from_id is automatically used from client configuration
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Message sent successfully:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending message:', error);
        throw error;
    }
}

// Example 2: Message with custom from_id
export async function customFromIdExample() {
    try {
        console.log('📱 Sending message with custom from_id...');

        const params : SendMessage = {
            message: 'Hello! This message uses a different from_id.',
            wa_id: constants.CLIENT_WA_ID,
            from_id: 11689 // Override default from_id
        };

        const result = await client.whatsapp.sendMessage(params);
        console.log('✅ Message sent with custom from_id:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending message with custom from_id:', error);
        throw error;
    }
}

// Example 3: Send multimedia file
export async function sendAttachmentExample() {
    try {
        console.log('📱 Sending multimedia file...');

        const params: SendAttachmentParams = {
            wa_id: constants.CLIENT_WA_ID,
            filePath: constants.URL_FILE_IMAGE,
            caption: 'This is a test image',    
            filename: 'image.jpg'
        };

        const result = await client.whatsapp.sendAttachment(params);
        console.log('✅ File sent successfully:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sending file:', error);
        throw error;
    }
}

// Validate API connection
export async function validateConnection() {
    try {
        console.log('🔍 Validating API connection...');
        
        // Try to get user information to validate connection
        const validate = await client.validateConnection();
        console.log('✅ Connection successful. User:', validate);
        return true;
    } catch (error) {
        console.error('❌ Connection error:', error);
        return false;
    }
}

// Main function to run all examples
async function runAllExamples() {
    console.log('🚀 Starting WhatsApp examples...\n');

    try {
        // Validate connection first
        const isConnected = await validateConnection();
        if (!isConnected) {
            console.log('❌ Could not connect. Check your API_KEY_WASAPI');
            return;
        }
        console.log('---\n');

        // Run examples
        await simpleMessageExample();
        console.log('---\n');

        await customFromIdExample();
        console.log('---\n');

        await sendAttachmentExample();
        console.log('---\n');

        console.log('🎉 All examples executed successfully!');
    } catch (error) {
        console.error('💥 Error during execution:', error);
    }
}

runAllExamples();