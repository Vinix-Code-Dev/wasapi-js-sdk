import { createBot, createFlow, createProvider, addKeyword as originalAddKeyword } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { WasapiProvider as Provider } from './wasapi'
import { ActionPropertiesKeyword, TFlow } from '@builderbot/bot/dist/types'

export const initBot = async ({ token, deviceId, port, flow }: { token: string, deviceId: string, port: string, flow: TFlow[] }) => {
    const adapterFlow = createFlow(flow)
    const adapterProvider = createProvider(Provider, { token, deviceId })
    const adapterDB = new Database()

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpServer(Number(port))
}

export const addKeyword = (
    keyword: string | [string, ...string[]],
    options?: ActionPropertiesKeyword
): TFlow<Provider, Database> => {
    return originalAddKeyword<Provider, Database>(keyword, options)
}