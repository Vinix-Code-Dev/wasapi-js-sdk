// Ejemplos para obtener todos los flows de WhatsApp

import constants from '../constants';
import { WasapiClient } from '../../src/wasapi';
import dotenv from 'dotenv';
import { GetFlowAssets, GetFlowResponses, SendFlow } from '../../src/wasapi/models/request/flow.model';

dotenv.config();

const client = new WasapiClient(process.env.API_KEY_WASAPI || '');

export async function getAllFlowsExample() {
    try {
        // Obtener todos los flows de WhatsApp
        const flows = await client.whatsapp.getFlows();
        
        console.log('=== Todos los Flows de WhatsApp ===');
        console.log(`Éxito: ${flows.success}`);
        
        if (flows.data && flows.data.length > 0) {
            console.log(`\nTotal de números de teléfono con flows: ${flows.data.length}`);
            
            flows.data.forEach((phoneFlow, phoneIndex) => {
                console.log(`\n📱 Teléfono ${phoneIndex + 1}:`);
                console.log(`   ID: ${phoneFlow.phone.id}`);
                console.log(`   Número: ${phoneFlow.phone.phone_number}`);
                console.log(`   Nombre: ${phoneFlow.phone.display_name}`);
                console.log(`   Éxito: ${phoneFlow.success}`);
                
                if (phoneFlow.error) {
                    console.log(`   Error: ${phoneFlow.error}`);
                }
                
                if (phoneFlow.flows && phoneFlow.flows.data && phoneFlow.flows.data.length > 0) {
                    console.log(`   Total de flows: ${phoneFlow.flows.data.length}`);
                    
                    phoneFlow.flows.data.forEach((flow, flowIndex) => {
                        console.log(`\n   🔄 Flow ${flowIndex + 1}:`);
                        console.log(`      ID: ${flow.id}`);
                        console.log(`      Nombre: ${flow.name}`);
                        console.log(`      Estado: ${flow.status}`);
                        
                        if (flow.categories && flow.categories.length > 0) {
                            console.log(`      Categorías: ${flow.categories.join(', ')}`);
                        }
                        
                        if (flow.validation_errors && flow.validation_errors.length > 0) {
                            console.log(`      Errores de validación: ${flow.validation_errors.length}`);
                        }
                    });
                } else {
                    console.log('   No hay flows disponibles para este número.');
                }
                console.log('   ---');
            });
        } else {
            console.log('No se encontraron flows de WhatsApp.');
        }
    } catch (error) {
        console.error('Error al obtener flows de WhatsApp:', error);
    }
}

export async function sendFlowExample() {
    try {
        // Ejemplo de envío de un flow
        console.log('\n=== Ejemplo de Envío de Flow ===');
        
        const flow : SendFlow = {
            wa_id: constants.CLIENT_WA_ID,
            message: 'Hola, te invito a completar nuestro flujo de encuesta',
            phone_id: parseInt(constants.MY_FROM_ID),
            cta: 'Completar encuesta',
            screen: 'welcome',
            flow_id: 'flow_example_id', // Este ID debe ser reemplazado por un ID real
            action: 'navigate' as const
        };
        
        console.log('Parámetros del flow:');
        console.log(JSON.stringify(flow, null, 2));
        
        // Nota: Este ejemplo está comentado porque requiere un flow_id válido
        // const result = await client.whatsapp.sendFlow(flowParams);
        // console.log('Resultado del envío:', result);
        
        console.log('⚠️  Nota: Este ejemplo requiere un flow_id válido para funcionar.');
    } catch (error) {
        console.error('Error al enviar flow:', error);
    }
}

export async function getFlowResponsesExample() {
    try {
        // Ejemplo de obtención de respuestas de un flow
        console.log('\n=== Ejemplo de Respuestas de Flow ===');
        
        const responseParams : GetFlowResponses = {
            flow_id: 'flow_example_id', // Este ID debe ser reemplazado por un ID real
            page: 1,
            per_page: 10
        };
        
        console.log('Parámetros de consulta:');
        console.log(JSON.stringify(responseParams, null, 2));
        
        // Nota: Este ejemplo está comentado porque requiere un flow_id válido
        // const responses = await client.whatsapp.getFlowResponses(responseParams);
        // console.log('Respuestas del flow:', responses);
        
        console.log('⚠️  Nota: Este ejemplo requiere un flow_id válido para funcionar.');
    } catch (error) {
        console.error('Error al obtener respuestas del flow:', error);
    }
}

export async function getFlowAssetsExample() {
    try {
        // Ejemplo de obtención de assets de un flow
        console.log('\n=== Ejemplo de Assets de Flow ===');
        
        const assetsParams : GetFlowAssets = {
            flow_id: constants.FLOW_ID, // Este ID debe ser reemplazado por un ID real
            phone_id: parseInt(constants.MY_FROM_ID)
        };
        
        console.log('Parámetros de consulta:');
        console.log(JSON.stringify(assetsParams, null, 2));
        
        const assets = await client.whatsapp.getFlowAssets(assetsParams);
        console.log('Assets del flow:', assets);
        
    } catch (error) {
        console.error('Error al obtener assets del flow:', error);
    }
}

export async function analyzeFlowCategoriesExample() {
    try {
        // Analizar las categorías de flows disponibles
        console.log('\n=== Análisis de Categorías de Flows ===');
        
        const flows = await client.whatsapp.getFlows();
        
        if (flows.data && flows.data.length > 0) {
            const categoryCount: { [key: string]: number } = {};
            const statusCount: { [key: string]: number } = {};
            
            flows.data.forEach(phoneFlow => {
                if (phoneFlow.flows && phoneFlow.flows.data) {
                    phoneFlow.flows.data.forEach(flow => {
                        // Contar estados
                        statusCount[flow.status] = (statusCount[flow.status] || 0) + 1;
                        
                        // Contar categorías
                        if (flow.categories) {
                            flow.categories.forEach(category => {
                                categoryCount[category] = (categoryCount[category] || 0) + 1;
                            });
                        }
                    });
                }
            });
            
            console.log('\n📊 Estadísticas de Estados:');
            Object.entries(statusCount).forEach(([status, count]) => {
                console.log(`   ${status}: ${count} flows`);
            });
            
            console.log('\n📊 Estadísticas de Categorías:');
            Object.entries(categoryCount).forEach(([category, count]) => {
                console.log(`   ${category}: ${count} flows`);
            });
        } else {
            console.log('No hay flows disponibles para analizar.');
        }
    } catch (error) {
        console.error('Error al analizar categorías de flows:', error);
    }
}

export async function runAllExamples() {
    console.log('🚀 Iniciando ejemplos de Flows de WhatsApp...\n');
    
    //await getAllFlowsExample();
        //await analyzeFlowCategoriesExample();
        //await sendFlowExample();
        //await getFlowResponsesExample();
        await getFlowAssetsExample();
    
    console.log('\n✅ Todos los ejemplos de flows de WhatsApp han sido ejecutados.');
} 