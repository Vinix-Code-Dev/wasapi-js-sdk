import dotenv from "dotenv";
//Exportamos libreria wasapi-sdk
import { initBot, addKeyword } from './wasapi/provider';

dotenv.config();

// Configuracion de variables de entorno
const port = process.env.PORT ?? '4000';
const token = process.env.API_KEY_WASAPI
const deviceId = process.env.DEVICE_ID

//Creacion del flujo
const flowPrincipal = addKeyword(['Hola', 'Buenos dias'])
  .addAnswer('Hola Bienvenido! ❤️ ')
  .addAnswer('Como te llamas', { capture: true }, async (ctx, { flowDynamic }) => {
    await flowDynamic([`Genial! ${ctx.body}`, 'Encantado de conocerte'])
  })
  
//iniciar bot
initBot({ token, deviceId, port, flow: [flowPrincipal] })
