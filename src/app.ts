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
  .addAnswer('Hola Bienvenido! desde addAnswer ')
  .addAction(async (ctx, { provider }) => {
    await provider.sendAttachment(ctx.from, 'https://wasapi-assets.s3.us-east-2.amazonaws.com/media/6617529600737-1754405177.jpeg', "esto viene con un caption", 'Video')
  })


//iniciar bot
initBot({ token, deviceId, port, flow: [flowPrincipal] })
