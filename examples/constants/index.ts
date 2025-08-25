//constantes de prueba para el envio de mensajes
// estos valores son de prueba y se deben cambiar por los valores reales    

const constants = {
    MY_FROM_ID: 11689, // id de la cuenta de whatsapp que esta vinculada a la cuenta de wasapi senders
    CLIENT_WA_ID: '573165170740', // Este seria el numero de whatsapp del cliente receptor
    FUNNEL_CONTACT_ID: 573993, // Este seria el id del contacto que se va a mover al funnel
    MESSAGE: 'Mensaje de prueba', // Este seria el mensaje que se va a enviar al cliente
    CAMPAIGN_ID: '3245a5bd-5d96-4691-a329-86cbbba65417', // Este seria el UUID de la campaña que se va a obtener
    TEMPLATE_UUID: '4d70b752-d6ed-4aa7-96e8-a693c07bff7f', // Este seria el uuid del template generado por meta 
    TEMPLATE_UUID_EXAMPLE_VARIABLES: 'b23257ae-fd97-4a31-9ee0-27a0032bd88d', // Este seria el uuid del template generado por meta con variables
    TEMPLATE_UUID_FILE_IMAGE: 'cfab3081-8b2f-44b0-be74-dc9699973cb4', // Este seria el uuid del template generado por meta con archivo de imagen
    TEMPLATE_UUID_FILE_PDF: '494eb68c-dc2c-4049-8309-3ca7c9ff3018', // Este seria el uuid del template generado por meta con archivo de pdf
    URL_FILE_IMAGE: '',  // Este seria la url de la imagen que se va a enviar al cliente
    URL_FILE_PDF: 'https://wasapi-assets.s3.us-east-2.amazonaws.com/media/8868091365386-1749679468.pdf', // Este seria la url del archivo pdf que se va a enviar al cliente
    FLOW_ID: '1460957158383809' // Este seria el id del flujo que se va a enviar al cliente del numero de my_from_id
}

export default constants;