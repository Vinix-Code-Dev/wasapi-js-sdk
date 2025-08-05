import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { WasapiProvider as Provider } from './wasapi/provider/wasapi'
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT ?? 4000;

const fullSamplesFlow = addKeyword<Provider, Database>(['Hola', 'Buenos dias'])
  .addAnswer('Hola Bienvenido! ❤️ ')
  .addAnswer('Como te llamas', { capture: true }, async (ctx, { flowDynamic }) => {
    await flowDynamic([`Genial! ${ctx.body}`, 'Encantado de conocerte'])
  })


const main = async () => {
  const adapterFlow = createFlow([fullSamplesFlow])

  const adapterProvider = createProvider(Provider, {
    token: process.env.API_KEY_WASAPI,
    deviceId: process.env.DEVICE_ID
  })
  const adapterDB = new Database()

  const { httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })

  httpServer(+PORT)
}

main()
