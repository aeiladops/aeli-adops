export interface WhatsAppRedirectResult {
  whatsappUrl: string | null;
  error?: string;
}

export function getWhatsAppNumber(): string {
  const envNumber = process.env.WHATSAPP_NUMBER;
  if (envNumber && envNumber.trim()) {
    return envNumber.replace(/\D/g, '');
  }
  return '917095185429';
}

export function generateWhatsAppRedirectUrl(data: {
  name: string;
  email: string;
  phone?: string;
  website: string;
  company?: string;
  services?: string[];
  adPlatform?: string;
  monthlyPageviews?: string;
  category?: string;
  requirements?: string;
  leadId?: string;
  formType?: 'Free Publisher Audit' | 'Service Request';
}): WhatsAppRedirectResult {
  const cleanNumber = getWhatsAppNumber();

  const formTitle = data.formType || 'Publisher Service Request';
  const servicesList = data.services && data.services.length > 0 ? data.services.join(', ') : 'Not Specified';

  const messageLines = [
    `*NEW WEBSITE SUBMISSION — AELI ADOPS*`,
    `----------------------------------------`,
    `📋 *Form Type:* ${formTitle}`,
    data.leadId ? `🆔 *Reference ID:* ${data.leadId}` : null,
    `👤 *Name:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
    data.phone ? `📞 *Phone/WhatsApp:* ${data.phone}` : null,
    `🌐 *Website:* ${data.website}`,
    data.category ? `🏷️ *Category:* ${data.category}` : null,
    data.monthlyPageviews ? `📊 *Monthly Pageviews:* ${data.monthlyPageviews}` : null,
    data.adPlatform ? `⚙️ *Ad Platform:* ${data.adPlatform}` : null,
    `🛠️ *Services Requested:* ${servicesList}`,
    data.requirements ? `📝 *Requirements:* ${data.requirements}` : null,
    `----------------------------------------`,
    `I would like to discuss this request further.`
  ].filter(Boolean);

  const message = messageLines.join('\n\n');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return { whatsappUrl };
}

