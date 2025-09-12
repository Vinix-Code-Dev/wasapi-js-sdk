# @wasapi/js-sdk

[![npm version](https://img.shields.io/npm/v/@wasapi/js-sdk.svg)](https://www.npmjs.com/package/@wasapi/js-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@wasapi/js-sdk.svg)](https://www.npmjs.com/package/@wasapi/js-sdk)
[![License](https://img.shields.io/npm/l/@wasapi/js-sdk.svg)](https://github.com/juanalvarezPro/@wasapi/js-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

Official Wasapi SDK to quickly integrate with WhatsApp, campaigns, contacts, flows and more.

## 🚀 Installation

```bash
npm install @wasapi/js-sdk
# or
yarn add @wasapi/js-sdk
```

## 📦 Import

```typescript
import { WasapiClient } from '@wasapi/js-sdk'
```

## ⚡ Quick Start

### 1. Client with from_id (Recommended for production)

```typescript
import { WasapiClient } from '@wasapi/js-sdk'

const client = new WasapiClient({
  apiKey: API_KEY,
  from_id: 123456, // Your WhatsApp number ID in Wasapi
})

// Validate connection
const isValid = await client.validateConnection()
if (isValid) {
  console.log('✅ Connection successful')
} else {
  console.log('❌ Connection error')
}
```

### 2. Client without from_id (For specific cases)

```typescript
import { WasapiClient } from '@wasapi/js-sdk'

// Option A: API key only
const client = new WasapiClient(API_KEY)

// Option B: With custom configuration
const client = new WasapiClient({
  apiKey: API_KEY,
  baseURL: 'https://api-ws.wasapi.io/api/v1' // Optional
})

// You'll need to specify from_id in each request
```

## 💬 Usage Examples

### Send Simple Message

```typescript
// With from_id in client
const result = await client.whatsapp.sendMessage({
  wa_id: '57300XXXXXXX',
  message: 'Hello! 👋'
  // from_id is automatically taken from client
})

// Without from_id in client
const result = await client.whatsapp.sendMessage({
  wa_id: '57300XXXXXXX',
  message: 'Hello! 👋',
  from_id: 123456 // You must specify it in each request
})
```

### Send Template

```typescript
import { SendTemplate } from '@wasapi/js-sdk/models'

const template: SendTemplate = {
  recipients: '57300XXXXXXX',
  template_id: 'TEMPLATE_UUID',
  contact_type: 'phone',
  chatbot_status: 'enable',
  conversation_status: 'unchanged'
  // from_id is taken from client if configured
}

const sent = await client.whatsapp.sendTemplate(template)
```

### Send Attachment

```typescript
const result = await client.whatsapp.sendAttachment({
  wa_id: '57300XXXXXXX',
  filePath: 'https://example.com/image.jpg',
  caption: 'Test image',
  filename: 'image.jpg'
  // from_id is taken from client if configured
})
```

## 🔧 Client Configuration

```typescript
interface WasapiConfig {
  apiKey: string;           // Your Wasapi API key (required)
  from_id?: string | number; // Your WhatsApp number ID (recommended)
  baseURL?: string;         // API base URL (optional, handled internally)
}

// Two ways to instantiate:
const client1 = new WasapiClient(API_KEY) // API key only
const client2 = new WasapiClient({ apiKey: API_KEY, from_id: 123 }) // With configuration
```

## 📚 Available Modules

- **`whatsapp`**: Messages, templates, attachments, conversations
- **`contacts`**: Contact management
- **`campaigns`**: Marketing campaigns
- **`flows`**: Automated flows
- **`labels`**: Contact labels
- **`metrics`**: Metrics and reports
- **`workflow`**: Process automation


## 📖 Complete Documentation

For detailed documentation, visit: **[wasapi-sdk.juanalvarez.pro](https://wasapi-sdk.juanalvarez.pro)**

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@wasapi/js-sdk)
- 🐛 [Issues](https://github.com/juanalvarezPro/@wasapi/js-sdk/issues)
- 📚 [Documentation](https://juanalvarez.pro)

## 📋 Requirements

- Node.js >= 18
- Wasapi API Key

<div align="center">

**⭐ ¡Dale una estrella a este repositorio si te resulta útil! ⭐**

Desarrollado con ❤️ por **[Juan Alvarez](https://juanalvarez.pro)**

[![n8n](https://img.shields.io/badge/n8n-Community%20Node-brightgreen)](https://n8n.io)
[![Wasapi](https://img.shields.io/badge/Wasapi-API%20Integration-blue)](https://wasapi.com)
[![Developer](https://img.shields.io/badge/Developer-Juan%20Alvarez-purple)](https://juanalvarez.pro)

</div>