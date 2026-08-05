import { PublisherAuditFormData } from '../validation/audit-form';

export function getAdminNotificationEmailHtml(data: PublisherAuditFormData): string {
  const monetisationStr = data.monetisationSetup.join(', ');
  const improvementsStr = data.areasToImprove.join(', ');
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Publisher Audit Request — ${data.company}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid #334155;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #2563eb; padding: 28px 40px; text-align: left;">
              <span style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; margin-bottom: 8px;">New Audit Lead</span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                New Publisher Audit Request — ${data.company}
              </h1>
            </td>
          </tr>

          <!-- Content Table -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #94a3b8;">
                Submitted at: <strong>${timestamp}</strong>
              </p>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: 100%; font-size: 14px; color: #f8fafc;">
                
                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; width: 35%; font-weight: 600; color: #94a3b8;">Full Name</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.name}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Company / Publication</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.company}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Website URL</td>
                  <td style="padding: 12px 0; font-weight: 500;">
                    <a href="${data.website}" style="color: #60a5fa; text-decoration: underline;" target="_blank">${data.website}</a>
                  </td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Business Email</td>
                  <td style="padding: 12px 0; font-weight: 500;">
                    <a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Phone / WhatsApp</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.phone || 'N/A'}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Publishing Category</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.category}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Monthly Pageviews</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.monthlyPageviews}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Audience Geography</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #ffffff;">${data.audienceGeography}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Monetisation Setup</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #38bdf8;">${monetisationStr}</td>
                </tr>

                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8;">Areas to Improve</td>
                  <td style="padding: 12px 0; font-weight: 500; color: #a7f3d0;">${improvementsStr}</td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #94a3b8; vertical-align: top;">Additional Information</td>
                  <td style="padding: 12px 0; font-weight: 400; color: #cbd5e1; line-height: 1.5;">${data.additionalInfo || 'None provided.'}</td>
                </tr>

              </table>

              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #334155; text-align: center;">
                <a href="mailto:${data.email}?subject=RE:%20Your%20Aeli%20AdOps%20Publisher%20Audit%20Request" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
                  Reply directly to ${data.name} &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                System notification generated by Aeli AdOps Backend Server.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
