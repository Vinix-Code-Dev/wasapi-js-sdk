import { WasapiClient } from '../../src/wasapi';
import { CreateContact } from '../../src/wasapi/models';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ejemplo de creacion de contactos
 */

// configuracion del cliente
const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

// ejemplo 1: contacto basico
export async function basicContactExample() {
    try {
        console.log('👤 Creando contacto basico...');
        
        const newContact: CreateContact = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            country_code: '+57',
            phone: '3001234567',
            notes: 'Potential client'
        };

        const result = await client.contacts.create(newContact);
        console.log('✅ Contacto basico creado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al crear contacto basico:', error);
        throw error;
    }
}

// ejemplo 2: contacto completo con etiquetas y campos personalizados
export async function completeContactExample() {
    try {
        console.log('👤 Creando contacto completo...');
        
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
        console.log('✅ Contacto completo creado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al crear contacto completo:', error);
        throw error;
    }
}

// ejemplo 3: contacto de empresa
export async function businessContactExample() {
    try {
        console.log('👤 Creando contacto de empresa...');
        
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
        console.log('✅ Contacto de empresa creado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al crear contacto de empresa:', error);
        throw error;
    }
}

    // ejemplo 4: contacto de ecommerce
export async function ecommerceContactExample() {
    try {
        console.log('👤 Creando contacto de ecommerce...');
        
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
        console.log('✅ Contacto de ecommerce creado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al crear contacto de ecommerce:', error);
        throw error;
    }
}

// ejemplo 5: contacto bloqueado
export async function blockedContactExample() {
    try {
        console.log('👤 Creando contacto bloqueado...');
        
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
        console.log('✅ Contacto bloqueado creado:', result);
        return result;
    } catch (error) {
        console.error('❌ Error al crear contacto bloqueado:', error);
        throw error;
    }
}

// funcion para ejecutar todos los ejemplos
export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de creacion de contactos...\n');
    
    try {
        // ejecutar ejemplos uno por uno
        await basicContactExample();
        console.log('---\n');
        
        await completeContactExample();
        console.log('---\n');
        
        await businessContactExample();
        console.log('---\n');
        
        await ecommerceContactExample();
        console.log('---\n');
        
        await blockedContactExample();
        console.log('---\n');
        
    console.log('🎉 Todos los ejemplos de creacion de contactos ejecutados exitosamente!');
    } catch (error) {
        console.error('💥 Error en la ejecucion de ejemplos:', error);
    }
}
