import { WasapiClient } from '../../src/wasapi';
import { CreateContact } from '../../src/wasapi/models';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ejemplo de creacion de contactos
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY || '');

// basic contact example
export async function basicContactExample() {
    try {
        console.log('👤 creating basic contact...');
        
        const newContact: CreateContact = {
            first_name: 'Daniel',
            last_name: 'Jaramillo',
            email: 'daniel.jaramillo@example.com',
            country_code: '+57',
            phone: '3256234567',
            notes: 'Potential client'
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ basic contact created:', result);
        return result;
    } catch (error) {
        console.error('❌ Error creating basic contact:', error);
        throw error;
    }
}

// complete contact example
export async function completeContactExample() {
    try {
        console.log('👤 creating complete contact...');
        
        const newContact: CreateContact = {
            first_name: 'Mary',
            last_name: 'Smith',
            email: 'mary.smith@company.com',
            country_code: '+57',
            phone: '3109876543',
            notes: 'Premium client interested in high-end products',
            blocked: false,
            unsubscribed: false,
            labels: [], // IDs de etiquetas existentes (vacio por ahora)
            custom_fields: {
                company: 'TechCorp Solutions',
                position: 'Marketing Director',
                registration_date: '2024-01-15',
                source: 'Website',
                budget: 'High',
                interest: 'Premium products'
            }
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ complete contact created:', result);
        return result;
    } catch (error) {
        console.error('❌ Error creating complete contact:', error);
        throw error;
    }
}

// business contact example
export async function businessContactExample() {
    try {
        console.log('👤 creating business contact...');
        
        const newContact: CreateContact = {
            first_name: 'Carlos',
            last_name: 'Rodriguez',
            email: 'carlos.rodriguez@startup.com',
            country_code: '+57',
            phone: '3155551234',
            notes: 'CEO of tech startup, interested in business solutions',
            blocked: false,
            unsubscribed: false,
            labels: [], // etiquetas para empresas (vacio por ahora)
            custom_fields: {
                company: 'StartupTech',
                position: 'CEO',
                company_size: '10-50 employees',
                industry: 'Technology',
                project: 'SaaS Platform',
                budget: 'Medium-High'
            }
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ business contact created:', result);
        return result;
    } catch (error) {
        console.error('❌ Error creating business contact:', error);
        throw error;
    }
}

// ecommerce contact example
export async function ecommerceContactExample() {
    try {
        console.log('👤 creating ecommerce contact...');
        
        const newContact: CreateContact = {
            first_name: 'Ana',
            last_name: 'Martinez',
            email: 'ana.martinez@gmail.com',
            country_code: '+57',
            phone: '3201234567',
            notes: 'Frequent customer, buys technology products',
            blocked: false,
            unsubscribed: false,
            labels: [], // etiquetas para ecommerce (vacio por ahora)
            custom_fields: {
                purchase_history: '5 purchases in the last 6 months',
                preferred_category: 'Technology',
                average_value: '$500',
                last_purchase: '2024-01-10',
                payment_method: 'Credit card',
                preferred_shipping: 'Express'
            }
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ ecommerce contact created:', result);
        return result;
    } catch (error) {
        console.error('❌ Error creating ecommerce contact:', error);
        throw error;
    }
}

// blocked contact example
export async function blockedContactExample() {
    try {
        console.log('👤 creating blocked contact...');
        
        const newContact: CreateContact = {
            first_name: 'Pedro',
            last_name: 'Lopez',
            email: 'pedro.lopez@spam.com',
            country_code: '+57',
            phone: '3009998888',
            notes: 'Contact blocked for spam',
            blocked: true,
            unsubscribed: true,
            labels: [], // etiquetas para bloqueados (vacio por ahora)
            custom_fields: {
                block_reason: 'Repetitive spam',
                block_date: '2024-01-15',
                contact_attempts: '10'
            }
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ blocked contact created:', result.data);
        return result;
    } catch (error) {
        console.error('❌ Error creating blocked contact:', error);
        throw error;
    }
}

// function to run all examples
 async function runAllExamples() {
    console.log('🚀 Starting contact creation examples...\n');
    
    try {
        await basicContactExample();
        console.log('----\n');
        await completeContactExample();
        console.log('----\n');
        await businessContactExample();
        console.log('----\n');
        await ecommerceContactExample();
        console.log('----\n');
        await blockedContactExample();
        console.log('----\n');
        console.log('✅ All contact creation examples executed successfully!');
    } catch (error) {
        console.error('💥 Error executing examples:', error);
    }
}

runAllExamples();