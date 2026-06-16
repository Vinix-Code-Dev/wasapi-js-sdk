# @wasapi/js-sdk

[![npm version](https://img.shields.io/npm/v/@wasapi/js-sdk.svg)](https://www.npmjs.com/package/@wasapi/js-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@wasapi/js-sdk.svg)](https://www.npmjs.com/package/@wasapi/js-sdk)
[![License](https://img.shields.io/npm/l/@wasapi/js-sdk.svg)](https://github.com/Vinix-Code-Dev/wasapi-js-sdk/blob/main/LICENSE)
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
const result = await client.whatsapp.sendMessage({
  wa_id: '57300XXXXXXX',
  message: 'Hello! 👋'
  // from_id is automatically taken from client
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
})
```

### List Conversations

```typescript
// All conversations (cursor-based pagination)
const res = await client.conversations.getAll({ per_page: 20 })

// Filter by status
const open = await client.conversations.getAll({ status: 'open' })

// Search by name
const search = await client.conversations.getAll({ query: 'John' })

// Next page using cursor
if (res.pagination.has_more) {
  const next = await client.conversations.getNextPage(res.pagination.next_cursor!)
}
```

---

## 🔧 Client Configuration

```typescript
interface WasapiConfig {
  apiKey: string;           // Your Wasapi API key (required)
  from_id?: number;         // Your WhatsApp number ID (recommended)
  baseURL?: string;         // API base URL (optional)
}

const client1 = new WasapiClient(API_KEY)                        // API key only
const client2 = new WasapiClient({ apiKey: API_KEY, from_id: 123 }) // With config
```

---

## 📚 Available Modules

### 💬 `whatsapp`
Manage WhatsApp messages, templates, attachments and flows.

| Method | Description |
|--------|-------------|
| `sendMessage({ from_id, wa_id, message })` | Send a text message |
| `sendAttachment({ from_id, wa_id, filePath, caption?, filename? })` | Send image, video, document or audio |
| `sendTemplate({ recipients, template_id, contact_type, from_id, ... })` | Send a template (up to 20 recipients) |
| `sendContacts({ wa_id, from_id, contacts })` | Send contact cards |
| `sendFlow({ wa_id, phone_id, flow_id, cta, screen, message })` | Send a WhatsApp Flow |
| `getConversation({ wa_id, from_id?, page? })` | Load conversation history |
| `getWhatsappNumbers()` | List WhatsApp lines on the account |
| `getWhatsappTemplates()` | List all templates |
| `getWhatsappTemplate({ template_uuid })` | Get a template by UUID |
| `getTemplatesByAppId({ from_id })` | Get templates for a specific line |
| `syncMetaTemplates()` | Sync templates from Meta |
| `changeStatus({ from_id, wa_id, status, message?, ... })` | Change conversation status or transfer to agent |
| `getFlows()` | List all WhatsApp Flows |
| `getFlowsByPhoneId(from_id?)` | Get published flows for a phone line |
| `getFlowResponses({ flow_id, page, per_page })` | Get flow responses |
| `getFlowAssets({ flow_id, phone_id? })` | Get flow assets |
| `getFlowScreens({ flow_id, phone_id? })` | Get flow screens |

---

### 📋 `conversations` ✨ New in v2.0.0
List, search and filter conversations with cursor-based pagination.

| Method | Description |
|--------|-------------|
| `getAll(params?)` | List/filter conversations |
| `getNextPage(cursor, params?)` | Navigate to next page |

**`getAll` parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `query` | `string` | Search term — activates search mode |
| `search_type` | `'contactName' \| 'all'` | Search scope |
| `status` | `'open' \| 'hold' \| 'closed'` | Filter by conversation state |
| `phones` | `string` | Comma-separated WhatsApp line IDs |
| `labels` | `string` | Comma-separated label IDs |
| `agents` | `string` | Comma-separated agent IDs |
| `dates` | `string` | Date range `YYYY-MM-DD,YYYY-MM-DD` |
| `without_labels` | `boolean` | Only conversations without labels |
| `cursor` | `string` | Pagination cursor |
| `per_page` | `number` | Results per page (1–50, default 20) |

---

### 👥 `contacts`
Full contact lifecycle management.

| Method | Description |
|--------|-------------|
| `getAll()` | List all contacts (paginated) |
| `getSearch({ search?, labels?, page? })` | Search contacts |
| `getById(wa_id)` | Get contact by phone number |
| `create({ first_name, last_name, email, country_code, phone, ... })` | Create a contact |
| `update({ wa_id, data })` | Update a contact |
| `delete(wa_id)` | Delete a contact |
| `addLabel({ contact_uuid, label_id })` | Add label to contact |
| `removeLabel({ contact_uuid, label_id })` | Remove label from contact |
| `assingAgentAutomatic({ contact_uuid })` | Auto-assign agent to contact |
| `export({ emails })` | Export contacts by email (max 5 emails) |

---

### 🏷️ `labels`
Tag and categorize contacts.

| Method | Description |
|--------|-------------|
| `getAll()` | List all labels |
| `getById(id)` | Get label by ID |
| `getSearch(name)` | Search label by name |
| `create({ title, description, color })` | Create a label |
| `update({ id, data })` | Update a label |
| `delete(id)` | Delete a label |

---

### 📊 `campaigns`
Manage messaging campaigns.

| Method | Description |
|--------|-------------|
| `getAll()` | List all campaigns |
| `getById(campaign_uuid)` | Get campaign by UUID |

---

### 🌀 `funnels`
Manage sales funnels and stages.

| Method | Description |
|--------|-------------|
| `getAll()` | List all funnels |
| `searchContact({ phoneNumber?, contactUuid? })` | Find contact in funnels |
| `moveContactToFunnel({ funnelContactId, toStageId })` | Move contact to a funnel stage |

---

### 🔧 `customFields`
Configure custom fields for contacts.

| Method | Description |
|--------|-------------|
| `getAll()` | List all custom fields |
| `create({ name })` | Create a custom field |
| `update({ id, data })` | Update a custom field |
| `delete(id)` | Delete a custom field |

---

### 🤖 `bot`
Control the chatbot per contact.

| Method | Description |
|--------|-------------|
| `toggleStatus({ wa_id, data })` | Enable or disable bot for a contact |

---

### 📈 `metrics`
Dashboard metrics and statistics.

| Method | Description |
|--------|-------------|
| `getOnlineAgents()` | Agents currently online |
| `getTotalCampaigns({ startDate, endDate })` | Total campaigns in range |
| `getConsolidatedConversations({ startDate, endDate })` | Conversations by status |
| `getAgentConversations({ startDate, endDate })` | Conversations per agent |
| `getStatusContacts()` | Contact status breakdown |
| `getMessages({ startDate, endDate })` | Message volume (in/out) |
| `getMessagesBot({ startDate, endDate })` | Bot message volume |
| `getAgentTimeResponse({ agentId, startDate, endDate })` | Agent response time |
| `getAgentTransferred({ agentId, startDate, endDate })` | Transferred conversations |
| `getAgentVolumeOfWork({ agentId, startDate, endDate })` | Agent workload volume |
| `getAgentTimeInConversation({ agentId, startDate, endDate })` | Time in conversation |

---

### 📑 `reports` ✨ New in v2.0.0
Performance and satisfaction reports.

| Method | Description |
|--------|-------------|
| `getPerformanceByAgent({ start_date, end_date, agent_id? })` | Agent performance report |
| `getVolumeOfWorkflow({ start_date, end_date, from_id? })` | Workflow volume by hour |
| `getSatisfactionSurvey({ start_date, end_date, agent_id? })` | Satisfaction survey report |

```typescript
// Example
const report = await client.reports.getSatisfactionSurvey({
  start_date: '2025-01-01',
  end_date: '2025-06-30'
})

console.log(report.data.summary.avg_rating)      // Average rating
console.log(report.data.ratings_distribution)    // Distribution 1–5
```

---

### ⚙️ `workflow`
Query workflow status history.

| Method | Description |
|--------|-------------|
| `getStatuses({ action?, phone?, agent_id?, dates?, per_page?, page? })` | List workflow status events |

---

### 👤 `user`
Account user information.

| Method | Description |
|--------|-------------|
| `getUser()` | Get authenticated user data |

---

## 📋 Requirements

- Node.js >= 18
- Wasapi API Key

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@wasapi/js-sdk)
- 🐛 [Issues](https://github.com/Vinix-Code-Dev/wasapi-js-sdk/issues)
- 🌐 [Wasapi](https://wasapi.io)

<div align="center">

**⭐ ¡Dale una estrella a este repositorio si te resulta útil! ⭐**

Desarrollado con ❤️ por **[Juan Camilo Alvarez](https://wasapi.io)**

[![Wasapi](https://img.shields.io/badge/Wasapi-API%20Integration-blue)](https://wasapi.io)

</div>
