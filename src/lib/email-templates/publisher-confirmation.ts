import { PublisherAuditFormData } from '../validation/audit-form';

export function getPublisherConfirmationEmailHtml(data: PublisherAuditFormData): string {
  const monetisationList = data.monetisationSetup.map((item) => `<li style="margin-bottom: 6px;">${item}</li>`).join('');
  const improvementsList = data.areasToImprove.map((item) => `<li style="margin-bottom: 6px;">${item}</li>`).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've Received Your Publisher Audit Request | Aeli AdOps</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 32px 40px; text-align: left;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 700; color: #ffffff; tracking: -0.5px;">Aeli <span style="color: #3b82f6;">AdOps</span></span>
                    <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Publisher Monetisation & Ad Operations</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                We've Received Your Publisher Audit Request
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Hello <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for requesting a Free Publisher Audit for <strong>${data.company}</strong> (<a href="${data.website}" style="color: #2563eb; text-decoration: none;">${data.website}</a>).
              </p>

              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Our AdOps technical team is reviewing your submitted details to examine your inventory structure, fill rates, viewability metrics, and programmatic monetization strategies.
              </p>

              <!-- Summary Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 28px; border-left: 4px solid #2563eb;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #0f172a;">Audit Request Summary</h3>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #334155;">
                      <tr>
                        <td style="padding-bottom: 12px; width: 40%; font-weight: 600; color: #64748b;">Website:</td>
                        <td style="padding-bottom: 12px; font-weight: 500;">${data.website}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px; font-weight: 600; color: #64748b;">Category:</td>
                        <td style="padding-bottom: 12px; font-weight: 500;">${data.category}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 16px; font-weight: 600; color: #64748b;">Monthly Pageviews:</td>
                        <td style="padding-bottom: 16px; font-weight: 500;">${data.monthlyPageviews}</td>
                      </tr>
                    </table>

                    <div style="margin-top: 12px;">
                      <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Current Monetisation Setup:</p>
                      <ul style="margin: 0 0 16px 0; padding-left: 20px; font-size: 14px; color: #1e293b;">
                        ${monetisationList}
                      </ul>
                    </div>

                    <div>
                      <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Focus Areas for Improvement:</p>
                      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #1e293b;">
                        ${improvementsList}
                      </ul>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- What's Next -->
              <h2 style="margin: 0 0 12px 0; font-size: 17px; font-weight: 600; color: #0f172a;">What Happens Next?</h2>
              <ol style="margin: 0 0 28px 0; padding-left: 20px; font-size: 15px; line-height: 1.6; color: #475569;">
                <li style="margin-bottom: 8px;"><strong>Initial Analysis:</strong> An AdOps specialist will evaluate your monetization setup.</li>
                <li style="margin-bottom: 8px;"><strong>Opportunity Report:</strong> We synthesize revenue gaps, yield improvements, and GAM optimization points.</li>
                <li style="margin-bottom: 8px;"><strong>Direct Outreach:</strong> We will reach out to you directly at <strong>${data.email}</strong> within 1-2 business days with your customized audit report and next steps.</li>
              </ol>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 24px;">
                <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                  Best regards,<br>
                  <strong style="color: #0f172a;">The Aeli AdOps Team</strong><br>
                  <a href="https://www.aeliadops.com" style="color: #2563eb; text-decoration: none;">www.aeliadops.com</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} Aeli AdOps. All rights reserved.<br>
                Empowering digital publishers with high-yield ad operations & programmatic intelligence.
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
