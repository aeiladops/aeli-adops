import fs from 'node:fs';
import path from 'node:path';
import { validatePublisherAuditForm } from '../src/lib/validation/audit-form';
import { appendToGoogleSheets } from '../src/lib/services/google-sheets-service';
import { sendAuditEmails } from '../src/lib/services/resend-service';
import { generateWhatsAppRedirectUrl } from '../src/lib/services/whatsapp-service';

// Load .env.local variables
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const val = valueParts.join('=').trim();
      if (key && val) {
        process.env[key.trim()] = val;
      }
    }
  }
}

console.log('=== RUNNING BACKEND INTEGRATIONS SUITE WITH .ENV.LOCAL ===\n');
console.log('Loaded GOOGLE_SHEETS_WEBHOOK_URL:', process.env.GOOGLE_SHEETS_WEBHOOK_URL);

// Sample Valid Form Data
const validPayload = {
  name: 'Sarah Mitchell',
  company: 'TechDaily Media',
  website: 'https://www.techdailymedia.com',
  email: 'sarah@techdailymedia.com',
  phone: '+1 (555) 012-3456',
  category: 'News & Media',
  monthlyPageviews: '500,000 – 2,000,000 / month',
  audienceGeography: 'North America (US & Canada)',
  monetisationSetup: ['Google Ad Manager', 'Header Bidding'],
  areasToImprove: ['Revenue', 'Viewability', 'eCPM / Yield'],
  additionalInfo: 'Testing live Google Sheets webhook integration.',
};

// 1. Validation Test
const validation = validatePublisherAuditForm(validPayload);
console.log('\n✔ [1. Server Validation] Status:', validation.isValid ? 'VALID' : 'INVALID');

if (validation.sanitizedData) {
  // 2. WhatsApp URL Generator Test
  process.env.WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '15550123456';
  const waResult = generateWhatsAppRedirectUrl(validation.sanitizedData);
  console.log('\n✔ [2. WhatsApp Redirect Generator] Result:');
  console.log('  - Generated URL:', waResult.whatsappUrl);

  // 3. Live Google Sheets Webhook Test
  console.log('\n✔ [3. Live Google Sheets Webhook Service] Sending live test payload...');
  appendToGoogleSheets(validation.sanitizedData).then((sheetsRes) => {
    console.log('  - Live Google Sheets Response:', sheetsRes);

    // 4. Resend Service Email Test
    console.log('\n✔ [4. Resend Email Service] Testing:');
    sendAuditEmails(validation.sanitizedData!).then((emailRes) => {
      console.log('  - Resend Result:', emailRes);
      console.log('\n=== ALL INTEGRATION TESTS COMPLETED ===');
    });
  });
}
