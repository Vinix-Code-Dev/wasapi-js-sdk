# 📚 Wasapi SDK Examples

This directory contains practical examples of how to use the Wasapi SDK for different functionalities.

## 🗂️ Examples Structure

### 🤖 **Bot**
- `toggleBotStatus.ts` - Change bot status for a contact

### 📋 **CustomFields (Custom Fields)**
- `getAllCustomFields.ts` - Get all custom fields
- `createCustomField.ts` - Create a new custom field
- `updateCustomField.ts` - Update an existing custom field
- `deleteCustomField.ts` - Delete a custom field

### 🔄 **Funnels**
- `getAllFunnels.ts` - Get all funnels
- `searchContactInFunnel.ts` - Search for a contact in funnels
- `moveContactToFunnel.ts` - Move a contact to another funnel stage

### 📊 **Metrics**
- `getOnlineAgents.ts` - Get online agents
- `getTotalCampaigns.ts` - Get total campaigns in a date range
- `getAgentMetrics.ts` - Get specific agent metrics
- `getStatusContacts.ts` - Get contact status
- `getMessagesMetrics.ts` - Get message and conversation metrics

### 👤 **User**
- `getUser.ts` - Get manager user information

### 📋 **Workflow**
- `getWorkflowStatuses.ts` - Get workflow statuses

### 📧 **WhatsApp**
- `sendMessage.ts` - Send WhatsApp message
- `sendTemplate.ts` - Send WhatsApp template
- `sendcontacts.ts` - Send contacts via WhatsApp
- `getTemplate.ts` - Get WhatsApp template

### 🏷️ **Labels**
- `getAllLabels.ts` - Get all labels
- `createLabel.ts` - Create a new label

### 👥 **Contacts**
- `getAllContacts.ts` - Get all contacts
- `createContact.ts` - Create a new contact

### 📢 **Campaigns**
- `getAllCampaigns.ts` - Get all campaigns
- `getCampaignById.ts` - Get campaign by ID

### 🔄 **Flows**
- `getAllFlows.ts` - Get all flows

## 🚀 How to Use the Examples

### 1. Initial Setup

Before running any example, make sure to:

1. **Configure your API Key**:
   ```bash
   export WASAPI_API_KEY="your-api-key-here"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### 2. Run an Example

To run any example, use the following command:

```bash
# Example: Get all contacts
npx ts-node examples/contacts/getAllContacts.ts

# Example: Send WhatsApp message
npx ts-node examples/whatsapp/sendMessage.ts

# Example: Get agent metrics
npx ts-node examples/metrics/getAgentMetrics.ts
```

### 3. Customize Examples

All examples use constants defined in `examples/constants/index.ts`. You can modify these values according to your needs:

```typescript
const constants = {
    MY_FROM_ID: 11689, // Your WhatsApp account ID
    CLIENT_WA_ID: '573132170740', // Client number
    MESSAGE: 'Test message', // Message to send
    // ... more constants
}
```


